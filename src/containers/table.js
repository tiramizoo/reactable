import { connect } from 'react-redux'
import last from 'lodash/last'
import first from 'lodash/first'

import TableComponent from '../components/table'
import { nextItem, previousItem, changeOffset, setLimit, setOffset } from '../actions/items_actions'


const mapStateToProps = state => ({
  items: state.items,
  filteredItems: state.filtered,
  currentItems: state.current_items,
  limit: state.limit,
  offset: state.offset,
})

const mapDispatchToProps = dispatch => (
  {
    nextItem: (filtered, currentItems, limit) => {
      const lastItem = last(currentItems)
      dispatch(nextItem(filtered, lastItem, limit))
    },
    previousItem: (filtered, currentItems, limit) => {
      const firstItem = first(currentItems)
      dispatch(previousItem(filtered, firstItem, limit))
    },
    changeOffset: (filtered, offset, limit) => {
      dispatch(changeOffset(filtered, offset, limit))
    },
    setLimit: (limit) => {
      dispatch(setLimit(limit))
    },
    setOffset: (offset) => {
      dispatch(setOffset(offset))
    },
  }
)

const Table = connect(
  mapStateToProps, mapDispatchToProps,
)(TableComponent)

export default Table
