import { connect } from 'react-redux'

import SearchTextComponent from './SearchText.jsx'
import { setSearch, updateViewport, setFilteredItems } from '../../actions/items'

const mapStateToProps = state => ({
  search: state.search,
  items: state.items,
  limit: state.limit,
  offset: state.offset,
})

const mapDispatchToProps = dispatch => (
  {
    setSearch: (column, value) => {
      dispatch(setSearch(column, value))
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
