import { connect } from 'react-redux'

import SearchDurationComponent from './SearchDuration.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema,
})

const mapDispatchToProps = () => ({})

const SearchDuration = connect(mapStateToProps, mapDispatchToProps)(SearchDurationComponent)
export default SearchDuration
