import { connect } from 'react-redux'

import SearchDateComponent from './SearchDate.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
})

const mapDispatchToProps = () => ({})

const SearchDate = connect(mapStateToProps, mapDispatchToProps)(SearchDateComponent)
export default SearchDate
