import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'
import Control from './components/Control'
import Table from './components/Table'

import { setItems, updateViewport } from './actions/items'

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
      settings, setItems, updateViewport,
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
    setItems: (items) => {
      dispatch(setItems(items))
    },
    updateViewport: (data, limit, offset) => {
      dispatch(updateViewport(data, limit, offset))
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
