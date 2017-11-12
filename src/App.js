import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Control from './components/Control'
import Table from './components/Table'

import json from './data-1000.json'
import { setItems, setLimit, setOffset, updateViewport } from './actions/items'
import { setSchema } from './actions/schema'

const limit = 20
const offset = 0

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setLimit(limit))
    dispatch(setOffset(offset))

    dispatch(setItems(json.data))
    dispatch(updateViewport(json.data, limit, offset))
    dispatch(setSchema(json.schema))
  }

  render() {
    return (
      <div className="App">
        <Control />
        <div className="reactable">
          <Table />
        </div>
      </div>
    )
  }
}

export default connect(() => ({}))(App)
