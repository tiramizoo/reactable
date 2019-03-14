import React, { Component } from 'react'

import Sidebar from '../Sidebar'
import ScrollBar from '../ScrollBar'
import Table from '../Table'


class Reactable extends Component {
  componentDidMount() {
    const {
      container, updateTableWidth,
    } = this.props

    updateTableWidth(container.clientWidth)

    window.addEventListener('resize', (e) => {
      updateTableWidth(container.clientWidth)
    })
  }

  render() {
    const { width, sidebarVisible } = this.props

    return (
      <div className="reactable" style={{ width }}>
        <Table />
        <ScrollBar />
        {sidebarVisible && <Sidebar />}
      </div>
    )
  }
}

export default Reactable
