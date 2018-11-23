import { connect } from 'react-redux'

import SearchControlComponent from './SearchControl.jsx'
import { setLimit, setOffset, updateViewport } from '../../actions/items'

const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.currentItems,
  filteredItems: state.filteredItems,
  limit: state.limit,
  offset: state.offset,
  controlShow: state.settings.controlShow,
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

const SearchControl = connect(mapStateToProps, mapDispatchToProps)(SearchControlComponent)

export default SearchControl
