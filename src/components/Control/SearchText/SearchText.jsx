import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { searching } from '../../../actions/search'

class SearchText extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByText = debounce((searchQuery) => {
    searching({searchQuery, store: this.context.store})
  }, 300)


  handleTextChange(e) {
    const { column, filter } = this.props

    const searchQuery = Object.assign({}, filter[column], { value: e.target.value, column })
    this.searchByText(searchQuery)
  }

  handleOptionsChange(e) {
    const { column, filter } = this.props
    const searchQuery = Object.assign({}, filter[column], { options: e.target.value, column })
    this.searchByText(searchQuery)
  }

  render() {
    const { column } = this.props
    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <br />
        <input onChange={(e) => this.handleTextChange(e)} type="search" placeholder={column} id={column} />
        <select onChange={(e) => this.handleOptionsChange(e)}>
          <option value="all">All</option>
          <option value="exact">Exact</option>
          <option value="empty">Empty</option>
          <option value="notEmpty">Not Empty</option>
        </select>
      </div>
    )
  }
}

export default SearchText
