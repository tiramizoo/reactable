import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import './index.css'
import SearchControl from './components/SearchControl'
import SchemaControl from './components/SchemaControl'
import Table from './components/Table'
import reducers from './reducers/index'
import { initSettings, updateTableWidth } from './actions/settings'
import { searching, reSearching } from './actions/search'
import { setItems, updateViewport } from './actions/items'
import { addMetaDataToItems, sortBy } from './helpers/utilities'

class InitApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducers, applyMiddleware(thunkMiddleware))
    this.store.dispatch(initSettings(props))
    this.fetchData()
  }

  search(column, value, options) {
    const query = { column, value, options }
    searching({ query, store: this.store })
  }

  multisearch(columns, value, options) {
    const query = { columns, value, options }
    searching({ query, store: this.store })
  }

  addData(newItems) {
    const { items, filteredSchema } = this.store.getState()
    const addedItems = sortBy(addMetaDataToItems([...items, ...newItems]), filteredSchema)

    this.store.dispatch(setItems(addedItems))
    this.store.dispatch(reSearching(addedItems))
  }

  updateTableWidth(width) {
    this.store.dispatch(updateTableWidth(width))
  }

  fetchData() {
    const { dataPath } = this.props
    const { filteredSchema, limit, offset } = this.store.getState()
    if (dataPath) {
      fetch(dataPath)
        .then(response => response.json())
        .then((json) => {
          const data = sortBy(addMetaDataToItems(json.data), filteredSchema)

          this.store.dispatch(setItems(data))
          this.store.dispatch(updateViewport(data, limit, offset))
        })
    }
  }

  render() {
    const documentElementId = document.getElementById(this.store.getState().settings.htmlId)
    if (documentElementId) {
      return ReactDOM.render(
        <Provider store={this.store}>
          <div className="reactable">
            <SchemaControl />
            <SearchControl />
            <Table />
          </div>
        </Provider>, documentElementId)
    }
    return null
  }
}

export const init = config => {
  return new InitApp(config)
}
