import { connect } from 'react-redux'

import TableComponent from './Table.jsx'
import { setOffset, updateViewport, setItems } from '../../actions/items'
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
  actions: state.settings.actions,

  scrollBarHeight: state.limit * rowHeight,
  scrollBarWidth: state.tableDimensions.width,
  scrollBarHandleHeight: state.filteredItems.length * rowHeight,
  tableWidth: state.tableDimensions.width,
  rowHeight,
})

const mapDispatchToProps = dispatch => (
  {
    setOffset: (offset) => {
      dispatch(setOffset(offset))
    },
    setItems: (items) => {
      dispatch(setItems(items))
    },
    updateViewport: (items, limit, offset) => {
      dispatch(updateViewport(items, limit, offset))
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
