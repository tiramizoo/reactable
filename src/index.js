import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import debounce from 'lodash/debounce'


import './index.css'
import SearchControl from './components/SearchControl'
import SchemaControl from './components/SchemaControl'
import Table from './components/Table'
import reducers from './reducers/index'
import { initSettings, updateTableWidth } from './actions/settings'
import { searchingAnd, searchingOr, reSearching } from './actions/search'
import { setItems, updateViewport } from './actions/items'
import { addMetaDataToItems, sortBy } from './helpers/utilities'

class InitApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducers, applyMiddleware(thunkMiddleware))
    this.store.dispatch(initSettings(props))
    this.store.subscribe(() => this.handleStateChange())
  }

  handleStateChange() {
    if (this.store.getState().lastAction === 'SET_FILTERED_ITEMS' && this.props.itemsChange) {
      this.props.itemsChange(this.getFilteredData())
    }
  }


  afterRender = debounce(() => {
    if (this.props.afterRender) {
      this.props.afterRender()
    }
  }, 150)

  searchAND(query) {
    searchingAnd({ query, store: this.store })
  }

  searchOR(query) {
    searchingOr({ query, store: this.store })
  }

  addData(newItems) {
    const { items, filteredSchema } = this.store.getState()
    const addedItems = sortBy(addMetaDataToItems([...items, ...newItems]), filteredSchema)

    this.store.dispatch(setItems(addedItems))
    this.store.dispatch(reSearching(addedItems))
  }

  getFilteredData() {
    return this.store.getState().filteredItems
  }

  updateTableWidth(width) {
    this.store.dispatch(updateTableWidth(width))
  }

  render() {
    const documentElementId = document.getElementById(this.store.getState().settings.htmlId)
    if (documentElementId) {
      return ReactDOM.render(
        <Provider store={this.store}>
          <div className="reactable">
            <Table />
            <SchemaControl />
            <SearchControl />
          </div>
        </Provider>, documentElementId, this.afterRender())
    }
    return null
  }
}

export const init = config => { return new InitApp(config) }
