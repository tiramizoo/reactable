import { connect } from 'react-redux'

import SearchTextComponent from './SearchText.jsx'

const mapStateToProps = state => ({
  filter: state.search,
})

const mapDispatchToProps = dispatch => ({})

const SearchText = connect(mapStateToProps, mapDispatchToProps)(SearchTextComponent)
export default SearchText
