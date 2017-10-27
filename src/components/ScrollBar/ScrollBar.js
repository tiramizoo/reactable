import { connect } from 'react-redux'

import ScrollBarComponent from './ScrollBar.jsx'

const isScrollBarVisible = state =>
  state.items.length > 0 && state.limit < state.items.length

const rowHeight = 30

const mapStateToProps = (state) => {
  const scrollBarVisible = isScrollBarVisible(state)

  if (scrollBarVisible) {
    return ({
      scrollBarVisible: true,
      scrollBarHeight: state.limit * rowHeight,
      scrollBarTop: rowHeight,
      scrollBarHandleHeight: (state.items.limit === 0) ?
        0 : ((state.limit / state.items.length) * (state.limit * rowHeight)),
      scrollBarHandleTop: (state.limit === 0 || state.offset === 0) ?
        0 : ((state.offset / state.items.length) * (state.limit * rowHeight)),
    })
  }
  return ({ scrollBarVisible: false })
}


const ScrollBar = connect(mapStateToProps)(ScrollBarComponent)

export default ScrollBar
