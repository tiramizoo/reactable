import { connect } from 'react-redux'

import SearchDateComponent from './SearchDate.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema,
  format: state.settings.dateFormat,
  separator: state.settings.dateSeparator,
})

const mapDispatchToProps = () => ({})

const SearchDate = connect(mapStateToProps, mapDispatchToProps)(SearchDateComponent)
export default SearchDate
