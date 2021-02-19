import { connect } from 'react-redux'

import SearchDateTimeComponent from './SearchDateTime.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema,
  displayTimeZone: state.settings.displayTimeZone,
})

const mapDispatchToProps = () => ({})

const SearchDateTime = connect(mapStateToProps, mapDispatchToProps)(SearchDateTimeComponent)
export default SearchDateTime
