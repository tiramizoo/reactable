import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

import { searchingAnd } from '../../../actions/search'
import { getPrefix } from '../../../helpers/utilities'

const initState = {
  value: '',
  options: 'all',
  dictionary: [],
  dictionaryVisible: false,
}

class SearchText extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    const { column, searchQueryAnd } = props
    if (searchQueryAnd[column]) {
      this.state = Object.assign({}, initState, searchQueryAnd[column])
    } else {
      this.state = initState
    }
  }

  searchByText = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  newSearchQuery(param) {
    const { column, searchQueryAnd } = this.props
    if (isEmpty(param.value) && (isEmpty(param.options) || param.options === initState.options) && isEmpty(param.dictionary)) {
      return {[column]: {}}
    }
    return {[column]: Object.assign({}, searchQueryAnd[column], { ...param })}
  }

  dictionaryArrowClassName() {
    const { dictionaryVisible } = this.state
    if (dictionaryVisible) {
      return 'toggle-arrow toggle-arrow__up'
    }
    return 'toggle-arrow toggle-arrow__down'
  }

  handleTextChange(e) {
    const params = { value: e.target.value , dictionary: [] }

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleOptionsChange(e) {
    const params = { options: e.target.value, dictionary: [] }

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleClearChange() {
    const { column } = this.props
    const { dictionaryVisible } = this.state

    this.setState(Object.assign({}, initState, {dictionaryVisible: dictionaryVisible}))
    this.searchByText({[column]: {}})
  }

  handleDictionaryChange(e, value) {
    const { dictionary, dictionaryVisible } = this.state
    let newDictionary = [...dictionary]

    if (dictionary.includes(value)) {
      newDictionary = dictionary.filter(v => v !== value)
    } else {
      newDictionary.push(value)
    }
    const params = Object.assign({}, initState, { dictionary: newDictionary, dictionaryVisible: dictionaryVisible })

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  handleToggleDictionary(e) {
    this.setState({dictionaryVisible: !this.state.dictionaryVisible})
  }

  render() {
    const { column, schema, containerId } = this.props
    const { value, options, dictionary, dictionaryVisible } = this.state

    return (
      <div className='SearchText'>
        <div className='attribute'>
          {schema[column].label || column}
          {!isEmpty(schema[column].dictionary) &&
            <button className={this.dictionaryArrowClassName()} onClick={() => this.handleToggleDictionary()}></button>
          }
          <button className='clear' onClick={() => this.handleClearChange()}></button>
        </div>

        <div className='attribute-filter'>
          {isEmpty(schema[column].dictionary) && <div>
            <input
              value={value}
              onChange={(e) => this.handleTextChange(e)}
              type="text"
              autoComplete="off"
            />
            <select
              value={options}
              onChange={(e) => this.handleOptionsChange(e)}
            >
              <option value="all">All</option>
              <option value="equal">Equal</option>
              <option value="notEqual">Not Equal</option>
              <option value="match">Match</option>
              <option value="notMatch">Not Match</option>
              <option value="empty">Empty</option>
              <option value="notEmpty">Not Empty</option>
            </select>
          </div>}
          {!isEmpty(schema[column].dictionary) && <div>
            {dictionaryVisible && <ul>
              {Object.keys(schema[column].dictionary).map(key => {
                const prefix = getPrefix(containerId, `search-dictionary-${column}`, key)
                const checked = dictionary.includes(key)
                return (<li key={prefix}>
                  <label htmlFor={prefix}>
                    {schema[column].dictionary[key]}
                  </label>
                  <input
                    id={prefix}
                    type="checkbox"
                    onChange={e => this.handleDictionaryChange(e, key)}
                    checked={checked}
                  />
                </li>)
              })}
            </ul>}
          </div>}
        </div>
      </div>
    )
  }
}

export default SearchText
