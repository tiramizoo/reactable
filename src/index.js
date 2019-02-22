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
import isEmpty from 'lodash/isEmpty'
import { DateTime, Duration } from 'luxon'

import Reactable from './components/Reactable'
import reducers from './reducers/index'
import { initSettings, updateTableWidth, setProgressMax, setNoData } from './actions/settings'
import { searchingAnd, searchingOr, reSearching } from './actions/search'
import { setItems, updateViewport, clearItems } from './actions/items'
import { sortBy, queryDataType, filterSchemaByType } from './helpers/utilities'
import { loadState, saveState } from './localStorage'


class InitApp {
  constructor(config) {
    this.config = config
    const persistedState = loadState(config.identifier)
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    // localStorage do not save formaters
    if (persistedState) {
      Object.keys(config.schema).forEach((k) => {
        if (!persistedState.filteredSchema[k]) {
          persistedState.filteredSchema[k] = config.schema[k]
        }

        if (config.schema[k].formatter) {
          Object.assign(persistedState.filteredSchema[k], { formatter: config.schema[k].formatter })
        }
        if (config.schema[k].type) {
          Object.assign(persistedState.filteredSchema[k], { type: config.schema[k].type })
        }
        if (config.schema[k].label) {
          Object.assign(persistedState.filteredSchema[k], { label: config.schema[k].label })
        }
        if (config.schema[k].filterable !== undefined) {
          Object.assign(persistedState.filteredSchema[k], { filterable: config.schema[k].filterable })
        }
        if (config.schema[k].dictionary) {
          Object.assign(persistedState.filteredSchema[k], { dictionary: config.schema[k].dictionary })
        }
      })

      Object.keys(persistedState).forEach((k) => {
        if (!config.schema[k]) {
          delete persistedState.filteredSchema[k]
        }
      })
    }

    this.store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)))
    this.store.dispatch(initSettings(config))
    this.store.subscribe(() => this.handleStateChange())
    // only if user provide uniq identifier we can save filteredSchema in local storage
    if (config.identifier) {
      this.store.subscribe(() => {
        saveState(config.identifier, {
          filteredSchema: this.store.getState().filteredSchema,
        })
      })
    }
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

  applySearchPreset(presetName) {
    const { searchPresets } = this.store.getState()
    this.searchAND(searchPresets[presetName])
  }

  clearData() {
    this.store.dispatch(clearItems())
  }

  addData(newItems, progressMax) {
    const { items, schema } = this.store.getState()
    if (isEmpty(newItems)) {
      this.store.dispatch(setNoData())
    }

    // optimisation needed: dateTimeAttributes, durationAttributes, timeAttributes can be calculated once on init
    const dateTimeAttributes = Object.keys(filterSchemaByType(schema, 'datetime'))
    const durationAttributes = Object.keys(filterSchemaByType(schema, 'duration'))
    const timeAttributes = Object.keys(filterSchemaByType(schema, 'time'))
    const textAttributes = Object.keys(filterSchemaByType(schema, 'text'))

    let addedItems = newItems.map((i) => {
      const item = Object.assign({}, pick(i, Object.keys(schema)), { _key: uniqueId() })

      dateTimeAttributes.forEach((attrName) => {
        if (item[attrName] !== null) {
          item[attrName] = DateTime.fromISO(item[attrName])
        }
      })

      durationAttributes.forEach((attrName) => {
        if (item[attrName] !== null) {
          item[attrName] = Duration.fromISO(item[attrName])
        }
      })

      timeAttributes.forEach((attrName) => {
        if (item[attrName] !== null) {
          const [h, m, s] = item[attrName].split(':')
          item[attrName] = Duration.fromObject({ hours: Number(h), minutes: Number(m), seconds: Number(s) })
        }
      })

      textAttributes.forEach((attrName) => {
        if (item[attrName] !== null) {
          item[attrName] = item[attrName].toString()
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
