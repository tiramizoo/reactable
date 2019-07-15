import React, { Component } from 'react'


import Table from '../Table'
import ScrollBar from '../ScrollBar'
import Counters from '../Counters'
import Sidebar from '../Sidebar'
import ProgressBar from '../ProgressBar'


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
        <Counters />
        <ProgressBar />
        {sidebarVisible && <Sidebar />}
      </div>
    )
  }
}

export default Reactable
