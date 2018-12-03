import { connect } from 'react-redux'

import SearchNumberComponent from './SearchNumber.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
})

const mapDispatchToProps = dispatch => ({})

const SearchNumber = connect(mapStateToProps, mapDispatchToProps)(SearchNumberComponent)
export default SearchNumber
