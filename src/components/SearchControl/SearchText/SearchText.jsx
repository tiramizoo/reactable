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
    if (isEmpty(param.value) && (isEmpty(param.options) || param.options === initState.options) && param.dictionary === []) {
      return {[column]: {}}
    }
    return {[column]: Object.assign({}, searchQueryAnd[column], { ...param })}
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

    this.setState(initState)
    this.searchByText({[column]: {}})
  }

  handleDictionaryChange(e, value) {
    const { dictionary } = this.state
    let newDictionary = [...dictionary]

    if (dictionary.includes(value)) {
      newDictionary = dictionary.filter(v => v !== value)
    } else {
      newDictionary.push(value)
    }
    const params = Object.assign({}, initState, { dictionary: newDictionary })

    this.searchByText(this.newSearchQuery(params))
    this.setState(params)
  }

  render() {
    const { column, schema, containerId } = this.props
    const { value, options, dictionary } = this.state

    return (
      <div className='SearchText'>
        <div className='attribute'>
          {schema[column].label || column}
          <button className='clear' onClick={() => this.handleClearChange()}></button>
        </div>

        <div className='attribute-filter'>
          <input
            value={value}
            onChange={(e) => this.handleTextChange(e)}
            type="text"
            placeholder={column}
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
          {schema[column].dictionary && <div>
            <ul>
              {schema[column].dictionary.map(value => {
                const prefix = getPrefix(containerId, `search-dictionary-${column}`, value)
                const checked = dictionary.includes(value)
                return (<li key={prefix}>
                  <label htmlFor={prefix}>
                    {value}
                  </label>
                  <input
                    id={prefix}
                    type="checkbox"
                    onChange={e => this.handleDictionaryChange(e, value)}
                    checked={checked}
                  />
                </li>)
              })}
            </ul>
          </div>}
        </div>
      </div>
    )
  }
}

export default SearchText
