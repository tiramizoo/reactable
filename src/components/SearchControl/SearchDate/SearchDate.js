import { connect } from 'react-redux'

import SearchDateComponent from './SearchDate.jsx'

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
})

const mapDispatchToProps = dispatch => ({})

const SearchDate = connect(mapStateToProps, mapDispatchToProps)(SearchDateComponent)
export default SearchDate
