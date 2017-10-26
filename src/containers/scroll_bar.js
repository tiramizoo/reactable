import { connect } from 'react-redux'

import ScrollBarComponent from '../components/scroll_bar'

// 30 is row height
const mapStateToProps = state => ({
  scrollBarHeight:        state.limit * 30,
  scrollBarTop:           30,
  scrollBarHandleHeight:  (state.items.limit === 0) ? 0 : ((state.limit / state.items.length) * (state.limit * 30)),
  scrollBarHandleTop:     (state.items.limit === 0 || state.offset === 0) ? 0 : ((state.offset / state.items.length) * (state.limit * 30))
})

const ScrollBar = connect(
  mapStateToProps
)(ScrollBarComponent)

export default ScrollBar
