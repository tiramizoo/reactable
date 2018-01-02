import { connect } from 'react-redux'

import TableComponent from './Table.jsx'
import { setOffset, updateViewport, sortItems } from '../../actions/items'
import { setSortDirection } from '../../actions/schema'

const rowHeight = 30
const tableWidth = 1920

const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.currentItems,
  limit: state.limit,
  offset: state.offset,
  schema: state.schema,

  scrollBarHeight: state.limit * rowHeight,
  scrollBarWidth: tableWidth,
  scrollBarHandleHeight: state.items.length * rowHeight,
  tableWidth: tableWidth
})

const mapDispatchToProps = dispatch => (
  {
    setOffset: (offset) => {
      dispatch(setOffset(offset))
    },
    updateViewport: (items, limit, offset) => {
      dispatch(updateViewport(items, limit, offset))
    },
    sortItems: (column, columnType, direction) => {
      dispatch(sortItems(column, columnType, direction))
    },
    setSortDirection: (key, direction) => {
      dispatch(setSortDirection(key, direction))
    },
  }
)

const Table = connect(mapStateToProps, mapDispatchToProps)(TableComponent)

export default Table
