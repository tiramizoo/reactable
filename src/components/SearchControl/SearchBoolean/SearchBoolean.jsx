import React, { Component} from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

import { searchingAnd } from '../../../actions/search'

const initState = {
  value: 'all'
}

class SearchBoolean extends Component {
  static contextTypes = {
    store: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)

    const { column, searchQueryAnd } = props
    if (searchQueryAnd[column]) {
      this.state = searchQueryAnd[column]
    } else {
      this.state = initState
    }
  }

  searchByBoolean = debounce((query) => {
    searchingAnd({query, store: this.context.store})
  }, 300)

  handleValueChange = (e) => {
    const { column, searchQueryAnd } = this.props
    const { value } = e.target

    this.setState({ value })
    let newSearchQuery = {[column]: Object.assign({}, searchQueryAnd[column], { value })}
    if (isEmpty(value) || value === 'all') {
      newSearchQuery =  {[column]: {}}
    }
    this.searchByBoolean(newSearchQuery)
  }

  handleClearChange() {
    const { column } = this.props

    this.setState(initState)
    this.searchByBoolean({[column]: {}})
  }

  render() {
    const { column, schema } = this.props
    const { value } = this.state

    return (
      <div className='SearchBoolean'>
        <div className='attribute'>
          {schema[column].label || column}
          <button className='clear' onClick={() => this.handleClearChange()}></button>
        </div>
        <div className='attribute-filter'>
          <select value={value} onChange={(e) => this.handleValueChange(e)}>
            <option value="all">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
            <option value="empty">Empty</option>
            <option value="notEmpty">Not Empty</option>
          </select>
        </div>
      </div>
    )
  }
}

export default SearchBoolean
