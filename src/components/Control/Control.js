import { connect } from 'react-redux'

import ControlComponent from './Control.jsx'
import { setLimit, setOffset, updateViewport } from '../../actions/items'

const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.currentItems,
  filteredItems: state.filteredItems,
  limit: state.limit,
  offset: state.offset,
  controlShow: state.settings.control,
  tableWidth: state.tableWidth,
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
    },
  }
)

const Control = connect(mapStateToProps, mapDispatchToProps)(ControlComponent)

export default Control
