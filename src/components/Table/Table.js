import { connect } from 'react-redux'

import TableComponent from './Table.jsx'
import { setOffset, updateViewport } from '../../actions/items'

const mapStateToProps = state => ({
  items: state.items,
  currentItems: state.currentItems,
  limit: state.limit,
  offset: state.offset,
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
