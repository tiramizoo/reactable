import { connect } from 'react-redux'

import SearchDateTimeComponent from './SearchDateTime.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema,
  format: state.settings.dateFormat,
  separator: state.settings.dateSeparator,
})

const mapDispatchToProps = () => ({})

const SearchDateTime = connect(mapStateToProps, mapDispatchToProps)(SearchDateTimeComponent)
export default SearchDateTime
