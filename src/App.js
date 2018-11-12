import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import Control from './components/Control'
import Table from './components/Table'

import { setItems, setLimit, setOffset, updateViewport } from './actions/items'
import { setSchema } from './actions/schema'

const limit = 20
const offset = 0

class App extends Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {
    this.fetchData()
  }

  fetchData() {
    const {
      settings, setOffset, setLimit, setItems, updateViewport, setSchema,
    } = this.props
    if (!!settings.dataPath) {
      fetch(settings.dataPath)
        .then(response => response.json())
        .then(json => {
          setLimit(limit)
          setOffset(offset)
          setItems(json.data)
          updateViewport(json.data, limit, offset)
          setSchema(json.schema)
        })
      }
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
const mapStateToProps = state => ({
  settings: state.settings,
})

const mapDispatchToProps = dispatch => (
  {
    setOffset: (offset) => {
      dispatch(setOffset(offset))
    },
    setLimit: (limit) => {
      dispatch(setLimit(limit))
    },
    setItems: (items) => {
      dispatch(setItems(items))
    },
    setSchema: (schema) => {
      dispatch(setSchema(schema))
    },
    updateViewport: (data, limit, offset) => {
      dispatch(updateViewport(data, limit, offset))
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
