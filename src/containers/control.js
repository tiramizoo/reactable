import { connect } from 'react-redux'

import ControlComponent from '../components/control'
import { setLimit, setOffset, updateViewport } from '../actions/items_actions'


const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.current_items,
  limit: state.limit,
  offset: state.offset,
})

const mapDispatchToProps = dispatch => (
  {
    setLimit: (limit) => {
      dispatch(setLimit(limit))
    },
    setOffset: (offset) => {
      dispatch(setOffset(offset))
    },
    updateViewport: (items, limit, offset) => {
      dispatch(updateViewport(items, limit, offset))
    }
  }
)

const Control = connect(
  mapStateToProps, mapDispatchToProps,
)(ControlComponent)

export default Control
