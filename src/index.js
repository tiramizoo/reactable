import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'
import reducers from './reducers/index'
import { initSettings } from './actions/settings'
import { searching } from './actions/search'

class InitApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducers)
    this.store.dispatch(initSettings(props))
  }

  search(column, value, options) {
    const query = { column, value, options }
    searching({ query, store: this.store })
  }

  render() {
    const documentElementId = document.getElementById(this.store.getState().settings.htmlId)
    if (documentElementId) {
      return ReactDOM.render(
        <Provider store={this.store}>
          <App />
        </Provider>, documentElementId)
    }
  }
}

export const init = (config) => {
  return new InitApp(config)
}
