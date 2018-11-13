import { connect } from 'react-redux'

import SearchTextComponent from './SearchText.jsx'

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
})

const mapDispatchToProps = dispatch => ({})

const SearchText = connect(mapStateToProps, mapDispatchToProps)(SearchTextComponent)
export default SearchText
