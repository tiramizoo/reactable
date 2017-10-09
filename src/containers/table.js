import { connect } from 'react-redux'
import last from 'lodash/last'
import first from 'lodash/first'
import TableComponent from '../components/table'
import { nextItem, prevousItem } from '../actions/items_actions'


const mapStateToProps = state => ({
  items: state.items,
  filteredItems: state.filtered,
  currentItems: state.current_items,
})

const mapDispatchToProps = dispatch => (
  {
    nextItem: (filtered, currentItems) => {
      const lastItem = last(currentItems)
      dispatch(nextItem(filtered, lastItem))
    },
    prevousItem: (filtered, currentItems) => {
      const firstItem = first(currentItems)
      dispatch(prevousItem(filtered, firstItem))
    },
  }
)

const Table = connect(
  mapStateToProps, mapDispatchToProps,
)(TableComponent)

export default Table
