import { connect } from 'react-redux'

import SearchListComponent from './SearchList.jsx'

const mapStateToProps = state => ({
  schema: state.schema,
})

const mapDispatchToProps = dispatch => ({})

const SearchList = connect(mapStateToProps, mapDispatchToProps)(SearchListComponent)

export default SearchList
