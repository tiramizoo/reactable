import { connect } from 'react-redux'

import SearchNumberComponent from './SearchNumber.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema
})

const mapDispatchToProps = () => ({})

const SearchNumber = connect(mapStateToProps, mapDispatchToProps)(SearchNumberComponent)
export default SearchNumber
