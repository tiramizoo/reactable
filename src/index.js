import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import App from './App'
import reducers from './reducers/index'
import { initSettings, updateTableWidth } from './actions/settings'
import { searching, reSearching } from './actions/search'
import { setItems } from './actions/items'
import { addMetaDataToItems } from './helpers/utilities'

class InitApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducers, applyMiddleware(thunkMiddleware))
    this.store.dispatch(initSettings(props))
  }

  search(column, value, options) {
    const query = { column, value, options }
    searching({ query, store: this.store })
  }

  addData(newItems) {
    const { items } = this.store.getState()
    const addedItems = addMetaDataToItems([...items, ...newItems])

    this.store.dispatch(setItems(addedItems))
    this.store.dispatch(reSearching(addedItems))
  }

  updateTableWidth(width) {
    this.store.dispatch(updateTableWidth(width))
  }

  render() {
    const documentElementId = document.getElementById(this.store.getState().settings.htmlId)
    if (documentElementId) {
      return ReactDOM.render(
        <Provider store={this.store}>
          <App />
        </Provider>, documentElementId)
    }
    return null
  }
}

export const init = (config) => {
  return new InitApp(config)
}
