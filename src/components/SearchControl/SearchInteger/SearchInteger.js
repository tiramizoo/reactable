import { connect } from 'react-redux'

import SearchIntegerComponent from './SearchInteger.jsx'

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
})

const mapDispatchToProps = dispatch => ({})

const SearchInteger = connect(mapStateToProps, mapDispatchToProps)(SearchIntegerComponent)
export default SearchInteger
