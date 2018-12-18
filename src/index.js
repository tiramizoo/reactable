import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
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
import { sortBy } from './helpers/utilities'


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

  filterSchemaByType(schema, type) {
    return pickBy(schema, (value, key) => {
      return value['type'] == type
    })
  }


  addData(newItems, progressMax) {
    const { items, schema } = this.store.getState()

    // optimisation needed: dateTimeAttributes, durationAttributes can be calculated once on init
    const dateTimeAttributes = Object.keys(this.filterSchemaByType(schema, 'datetime'))
    const durationAttributes = Object.keys(this.filterSchemaByType(schema, 'duration'))

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
