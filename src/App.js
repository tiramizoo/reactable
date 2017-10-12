import React, { Component } from 'react';
import { connect } from 'react-redux'
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
        <Table />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
})

export default connect(mapStateToProps)(App)
