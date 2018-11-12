import { connect } from 'react-redux'

import SearchBooleanComponent from './SearchBoolean.jsx'

const mapStateToProps = state => ({
  filter: state.search,
})

const mapDispatchToProps = dispatch => ({})

const SearchBoolean = connect(mapStateToProps, mapDispatchToProps)(SearchBooleanComponent)
export default SearchBoolean
