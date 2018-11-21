import { connect } from 'react-redux'

import TableComponent from './Table.jsx'
import { setOffset, updateViewport, sortItems } from '../../actions/items'
import { setSortDirection } from '../../actions/schema'
import { toggleSearchControl, toggleSchemaControl } from '../../actions/settings'

const rowHeight = 30

const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.currentItems,
  filteredItems: state.filteredItems,
  limit: state.limit,
  offset: state.offset,
  schema: state.schema,
  filteredSchema: state.filteredSchema,

  scrollBarHeight: state.limit * rowHeight,
  scrollBarWidth: state.tableWidth,
  scrollBarHandleHeight: state.filteredItems.length * rowHeight,
  tableWidth: state.tableWidth,
  rowHeight,
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
    toggleSearchControl: () => dispatch(toggleSearchControl()),
    toggleSchemaControl: () => dispatch(toggleSchemaControl()),
  }
)

const Table = connect(mapStateToProps, mapDispatchToProps)(TableComponent)

export default Table
