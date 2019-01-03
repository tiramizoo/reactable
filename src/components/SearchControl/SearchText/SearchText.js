import { connect } from 'react-redux'

import SearchTextComponent from './SearchText.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
  schema: state.schema,
  containerId: state.settings.container.id,
})

const mapDispatchToProps = () => ({})

const SearchText = connect(mapStateToProps, mapDispatchToProps)(SearchTextComponent)
export default SearchText
