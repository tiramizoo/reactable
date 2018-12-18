import React, { Component } from 'react'

import SearchControl from '../SearchControl'
import SchemaControl from '../SchemaControl'
import ScrollBar from '../ScrollBar'
import Table from '../Table'


class Reactable extends Component {

  componentDidMount() {
    const {
      container, updateTableWidth
    } = this.props

    updateTableWidth(container.clientWidth)

    window.addEventListener('resize', (e) => {
      updateTableWidth(container.clientWidth)
    })
  }

  render() {
    const { width } = this.props

    return(
      <div className="reactable" style={{ width }}>
        <Table />
        <ScrollBar />
        <SchemaControl />
        <SearchControl />
      </div>
    )
  }
}

export default Reactable
