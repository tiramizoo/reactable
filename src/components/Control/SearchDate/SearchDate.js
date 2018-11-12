import { connect } from 'react-redux'

import SearchDateComponent from './SearchDate.jsx'

const mapStateToProps = state => ({
  filter: state.search,
})

const mapDispatchToProps = dispatch => ({})

const SearchDate = connect(mapStateToProps, mapDispatchToProps)(SearchDateComponent)
export default SearchDate
