import { connect } from 'react-redux'

import ScrollBarComponent from './ScrollBar.jsx'
import { setLimit, setOffset, updateViewport } from '../../actions/items'



const calculateScrollBarHeight = (state) => {
  return state.table.rowHeight * state.limit
}

const calculateScrollBarHandleHeight = (state) => {
  if (state.filteredItems.length) {
    const ratio = state.limit / state.filteredItems.length;
    return ratio * calculateScrollBarHeight(state)
  } else {
    return 0
  }
}

const calculateScrollBarHandleTopOffset = (state) => {
  if (state.offset && state.filteredItems.length) {
    return (state.offset / state.filteredItems.length) * calculateScrollBarHeight(state)
  } else {
    return 0
  }
}
const mapStateToProps = state => ({
  tableWidth:               state.table.width,

  scrollBarHeight:          calculateScrollBarHeight(state),
  scrollBarTopOffset:       state.table.rowHeight,

  scrollBarHandleHeight:    calculateScrollBarHandleHeight(state),
  scrollBarHandleTopOffset: calculateScrollBarHandleTopOffset(state),
  scrollBarVisible:         state.filteredItems.length > state.limit
})

const mapDispatchToProps = dispatch => ({})

const ScrollBar = connect(mapStateToProps, mapDispatchToProps)(ScrollBarComponent)

export default ScrollBar
