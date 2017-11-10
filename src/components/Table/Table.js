import { connect } from 'react-redux'

import TableComponent from './Table.jsx'
import { setOffset, updateViewport } from '../../actions/items'

const rowHeight = 30
const tableWidth = 800

const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.currentItems,
  limit: state.limit,
  offset: state.offset,

  scrollBarHeight: state.limit * rowHeight,
  scrollBarWidth: tableWidth,
  scrollBarHandleHeight: state.items.length * rowHeight
})

const mapDispatchToProps = dispatch => (
  {
    setOffset: (offset) => {
      dispatch(setOffset(offset))
    },
    updateViewport: (items, limit, offset) => {
      dispatch(updateViewport(items, limit, offset))
    },
  }
)

const Table = connect(mapStateToProps, mapDispatchToProps)(TableComponent)

export default Table
