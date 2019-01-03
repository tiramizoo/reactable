import { connect } from 'react-redux'

import SearchControlComponent from './SearchControl.jsx'
import { clearAllSearchQuery } from '../../actions/search'

const mapStateToProps = state => ({
  tableWidth: state.table.width,
  schema: state.schema,
})

const mapDispatchToProps = {
  clearAllSearchQuery
}

const SearchControl = connect(mapStateToProps, mapDispatchToProps)(SearchControlComponent)
export default SearchControl
