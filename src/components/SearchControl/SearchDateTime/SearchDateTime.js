import { connect } from 'react-redux'

import SearchDateTimeComponent from './SearchDateTime.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema
})

const mapDispatchToProps = () => ({})

const SearchDateTime = connect(mapStateToProps, mapDispatchToProps)(SearchDateTimeComponent)
export default SearchDateTime
