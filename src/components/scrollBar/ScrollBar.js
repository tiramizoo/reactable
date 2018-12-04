import { connect } from 'react-redux'

import ScrollBarComponent from './ScrollBar.jsx'
import { setLimit, setOffset, updateViewport } from '../../actions/items'

const calculateScrollBarHandleTopOffset = (state) => {
  if (state.offset && state.filteredItems.length) {
    return (state.offset / state.filteredItems.length) * (state.table.rowHeight * state.limit)
  } else {
    return 0
  }
}

const mapStateToProps = state => ({
  tableWidth:         state.table.width,
  scrollBarHeight:    state.table.rowHeight * state.limit,
  scrollBarTopOffset: state.table.rowHeight,

  scrollBarHandleHeight: (state.limit / state.filteredItems.length) * (state.table.rowHeight * state.limit),
  scrollBarHandleTopOffset: calculateScrollBarHandleTopOffset(state)
})

const mapDispatchToProps = dispatch => ({})

const ScrollBar = connect(mapStateToProps, mapDispatchToProps)(ScrollBarComponent)

export default ScrollBar
