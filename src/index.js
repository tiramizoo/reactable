import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import uniqueId from 'lodash/uniqueId'
import pickBy from 'lodash/pickBy'
import debounce from 'lodash/debounce'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { DateTime, Duration } from 'luxon'

import Reactable from './components/Reactable'
import reducers from './reducers/index'
import { initSettings, updateTableWidth, setProgressMax } from './actions/settings'
import { searchingAnd, searchingOr, reSearching } from './actions/search'
import { setItems, updateViewport } from './actions/items'
import { sortBy, queryDataType, filterSchemaByType } from './helpers/utilities'
import { loadState, saveState } from './localStorage'


class InitApp {
  constructor(config) {
    this.config = config
    const persistedState = loadState(config.container.id)
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    this.store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)))
    this.store.dispatch(initSettings(config))
    this.store.subscribe(() => this.handleStateChange())
    this.store.subscribe(() => {
      saveState(config.container.id, {
        filteredSchema: this.store.getState().filteredSchema,
      })
    })
  }

  handleStateChange() {
    if (this.store.getState().lastAction === 'SET_FILTERED_ITEMS' && this.config.itemsChange) {
      this.config.itemsChange(this.getFilteredData())
    }
  }

  afterRender = debounce(() => {
    if (this.config.afterRender) {
      this.config.afterRender()
    }
  }, 150)

  searchAND(query) {
    const { schema } = this.store.getState()
    const newQuery = queryDataType(query, schema)
    searchingAnd({ query: newQuery, store: this.store })
  }

  searchOR(query) {
    const { schema } = this.store.getState()
    const newQuery = queryDataType(query, schema)
    searchingOr({ query: newQuery, store: this.store })
  }

  addData(newItems, progressMax) {
    const { items, schema } = this.store.getState()

    // optimisation needed: dateTimeAttributes, durationAttributes can be calculated once on init
    const dateTimeAttributes = Object.keys(filterSchemaByType(schema, 'datetime'))
    const durationAttributes = Object.keys(filterSchemaByType(schema, 'duration'))
    const timeAttributes = Object.keys(filterSchemaByType(schema, 'time'))

    let addedItems = newItems.map((i) => {
      const item = Object.assign({}, pick(i, Object.keys(schema)), { _key: uniqueId() })

      dateTimeAttributes.forEach((attrName) => {
        const valueBeforeParse = item[attrName]
        if (valueBeforeParse !== null) {
          item[attrName] = DateTime.fromISO(item[attrName])
        }
      })

      durationAttributes.forEach((attrName) => {
        const valueBeforeParse = item[attrName]
        if (valueBeforeParse !== null) {
          item[attrName] = Duration.fromISO(item[attrName])
        }
      })

      timeAttributes.forEach((attrName) => {
        const valueBeforeParse = item[attrName]
        if (valueBeforeParse !== null) {
          const [h, m, s] = item[attrName].split(':')
          item[attrName] = Duration.fromObject({ hours: Number(h), minutes: Number(m), seconds: Number(s) })
        }
      })

      return item
    })

    const itemsAfterAddition = sortBy(items.concat(addedItems), schema)

    this.store.dispatch(setItems(itemsAfterAddition))
    this.store.dispatch(reSearching(itemsAfterAddition))
    if (progressMax) this.store.dispatch(setProgressMax(progressMax))
  }

  getFilteredData() {
    return this.store.getState().filteredItems.map((item) => {
      return omit(item, '_key')
    })
  }

  updateTableWidth(width) {
    this.store.dispatch(updateTableWidth(width))
  }

  render() {
    const state = this.store.getState()
    return ReactDOM.render(
      <Provider store={this.store}>
        <Reactable />
      </Provider>, state.settings.container, this.afterRender())
  }
}

export const init = config => { return new InitApp(config) }
