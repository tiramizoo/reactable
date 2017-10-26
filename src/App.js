import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Control from './containers/control';
import Table from './containers/table';
import ScrollBar from './containers/scroll_bar';


import items from './data-1000.json'
import { setItems, setLimit, setOffset, updateViewport } from './actions/items_actions'

const limit  = 20
const offset = 0

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setLimit(limit))
    dispatch(setOffset(offset))

    dispatch(setItems(items))
    dispatch(updateViewport(items, limit, offset))
  }

  render() {
    return (
      <div className='App'>
        <Control />
        <div className='reactable'>
          <Table />
          <ScrollBar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(App)
