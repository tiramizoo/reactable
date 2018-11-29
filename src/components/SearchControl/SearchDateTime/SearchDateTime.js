import { connect } from 'react-redux'

import SearchDateTimeComponent from './SearchDateTime.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
})

const mapDispatchToProps = dispatch => ({})

const SearchDateTime = connect(mapStateToProps, mapDispatchToProps)(SearchDateTimeComponent)
export default SearchDateTime
