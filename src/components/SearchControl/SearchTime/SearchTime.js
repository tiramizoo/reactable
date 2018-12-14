import { connect } from 'react-redux'

import SearchTimeComponent from './SearchTime.jsx'

const mapStateToProps = state => ({
  searchQueryAnd: state.searchQueryAnd,
})

const mapDispatchToProps = () => ({})

const SearchTime = connect(mapStateToProps, mapDispatchToProps)(SearchTimeComponent)
export default SearchTime
