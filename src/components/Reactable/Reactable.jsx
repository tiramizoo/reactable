import React from 'react'

import SearchControl from '../SearchControl'
import SchemaControl from '../SchemaControl'
import ScrollBar from '../ScrollBar'
import Table from '../Table'

const Reactable = (props) => {
  const { width } = props

  return (
    <div className="reactable" style={{ width }}>
      <Table />
      <ScrollBar />
      <SchemaControl />
      <SearchControl />
    </div>
  )
}

export default Reactable
