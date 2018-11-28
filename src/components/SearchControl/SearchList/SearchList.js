import { connect } from 'react-redux'

import SearchListComponent from './SearchList.jsx'
import { clearAllSearchQuery } from '../../../actions/search'

const mapStateToProps = state => ({
  schema: state.schema,
  filteredSchema: state.filteredSchema,
})

const mapDispatchToProps = {
  clearAllSearchQuery,
}

const SearchList = connect(mapStateToProps, mapDispatchToProps)(SearchListComponent)

export default SearchList