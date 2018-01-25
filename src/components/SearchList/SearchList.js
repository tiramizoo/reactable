import { connect } from 'react-redux'

import SearchListComponent from './SearchList.jsx'

const mapStateToProps = state => ({
  schema: state.schema,
})

const SearchList = connect(mapStateToProps)(SearchListComponent)

export default SearchList
