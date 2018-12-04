import { connect } from 'react-redux'

import SearchNumberComponent from './SearchNumber.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
})

const mapDispatchToProps = () => ({})

const SearchNumber = connect(mapStateToProps, mapDispatchToProps)(SearchNumberComponent)
export default SearchNumber
