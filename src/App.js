import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import Table from './containers/table';
import data from './reactable.json'
import { setItems } from './actions/items_actions'


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setItems(data))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          HI, Hello <code>src/App.js</code> and save to reload.
        </p>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
})

export default connect(mapStateToProps)(App)
