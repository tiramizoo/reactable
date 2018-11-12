import React, { Component} from 'react'
import debounce from 'lodash/debounce'

import { searching } from '../../../actions/search'

class SearchBoolean extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  searchByBoolean = debounce((searchQuery) => {
    searching({searchQuery, store: this.context.store})
  })

  handleOptionsChange = (e) => {
    const { column, filter } = this.props

    const searchQuery = Object.assign({}, filter[column], { options: e.target.value, column })
    this.searchByBoolean(searchQuery)
  }

  render() {
    const { column } = this.props

    return (
      <div>
        <label htmlFor={column}>{column}</label>
        <br />
        <select onChange={(e) => this.handleOptionsChange(e)}>
          <option value="all">All</option>
          <option value="true">True</option>
          <option value="false">False</option>
          <option value="empty">Empty</option>
          <option value="notEmpty">Not Empty</option>
        </select>
      </div>
    )
  }
}

export default SearchBoolean
