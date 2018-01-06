import { connect } from 'react-redux'

import SearchTextComponent from './SearchText.jsx'
import { setSearchQuery, updateViewport, setFilteredItems } from '../../actions/items'

const mapStateToProps = state => ({
  search: state.search,
  schema: state.schema,
  items: state.items,
  limit: state.limit,
  offset: state.offset,
})

const mapDispatchToProps = dispatch => (
  {
    setSearchQuery: (column, query) => {
      dispatch(setSearchQuery(column, query))
    },
    updateViewport: (items, limit, offset) => {
      dispatch(updateViewport(items, limit, offset))
    },
    setFilteredItems: (items) => {
      dispatch(setFilteredItems(items))
    },
  }
)

const SearchText = connect(mapStateToProps, mapDispatchToProps)(SearchTextComponent)

export default SearchText
