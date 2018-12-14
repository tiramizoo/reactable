import { connect } from 'react-redux'

import SearchTextComponent from './SearchText.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema
})

const mapDispatchToProps = () => ({})

const SearchText = connect(mapStateToProps, mapDispatchToProps)(SearchTextComponent)
export default SearchText
