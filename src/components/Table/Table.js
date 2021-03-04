import { connect } from 'react-redux'

import TableComponent from './Table.jsx'
import {
  setOffset,
  updateViewport,
  setFilteredItems,
  setSortItems,
} from '../../actions/items'
import { setSortDirection } from '../../actions/schema'

const mapStateToProps = (state) => ({
  schema: state.schema,
  filteredSchema: state.filteredSchema,

  items: state.items,
  currentItems: state.currentItems,
  filteredItems: state.filteredItems,

  limit: state.limit,
  offset: state.offset,

  actions: state.settings.actions,
  disableSeconds: state.settings.disableSeconds,
  displayTimeZone: state.settings.displayTimeZone,

  sidebarVisible: state.settings.sidebarVisible,

  tableWidth: state.table.width,
  rowHeight: state.table.rowHeight,
})

const mapDispatchToProps = (dispatch) => ({
  setOffset: (offset) => dispatch(setOffset(offset)),
  setFilteredItems: (items) => dispatch(setFilteredItems(items)),
  setSelectedItems: (items) => dispatch(setSelectedItems(items)),
  setSortItems: (items) => dispatch(setSortItems(items)),
  updateViewport: (items, limit, offset) =>
    dispatch(updateViewport(items, limit, offset)),
  setSortDirection: (key, direction) =>
    dispatch(setSortDirection(key, direction)),
})

const Table = connect(mapStateToProps, mapDispatchToProps)(TableComponent)
export default Table
