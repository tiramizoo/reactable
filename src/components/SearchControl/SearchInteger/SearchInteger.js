import { connect } from 'react-redux'

import SearchIntegerComponent from './SearchInteger.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
})

const mapDispatchToProps = dispatch => ({})

const SearchInteger = connect(mapStateToProps, mapDispatchToProps)(SearchIntegerComponent)
export default SearchInteger
