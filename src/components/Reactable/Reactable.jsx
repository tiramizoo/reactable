import React, { Component } from 'react'

import Table from '../Table'
import ScrollBar from '../ScrollBar'
import Counters from '../Counters'
import Sidebar from '../Sidebar'

const classNames = require('classnames')

class Reactable extends Component {
  componentDidMount() {
    const { container, updateTableWidth } = this.props

    updateTableWidth(container.clientWidth)

    window.addEventListener('resize', (e) => {
      updateTableWidth(container.clientWidth)
    })
  }

  render() {
    const { width, sidebarVisible } = this.props

    return (
      <div className={classNames('reactable', { sidebarVisible: sidebarVisible })} style={{ width }}>
        <Table />
        <ScrollBar />
        <Counters />
        {sidebarVisible && <Sidebar />}
      </div>
    )
  }
}

export default Reactable
