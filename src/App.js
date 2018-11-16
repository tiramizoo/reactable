import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import Control from './components/Control'
import Table from './components/Table'

import { setItems, updateViewport } from './actions/items'

class App extends Component {
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const {
      settings, setItems, updateViewport, limit, offset
    } = this.props
    if (!!settings.dataPath) {
      fetch(settings.dataPath)
        .then(response => response.json())
        .then(json => {
          setItems(json.data)
          updateViewport(json.data, limit, offset)
        })
      }
  }

  render() {
    return (
      <div className="reactable">
        <Control />
        <Table />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  offset:   state.offset,
  limit:    state.limit,
  settings: state.settings,
})

const mapDispatchToProps = dispatch => (
  {
    setItems: (items) => {
      dispatch(setItems(items))
    },
    updateViewport: (data, limit, offset) => {
      dispatch(updateViewport(data, limit, offset))
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
