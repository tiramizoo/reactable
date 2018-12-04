import { connect } from 'react-redux'

import SearchControlComponent from './SearchControl.jsx'
import { clearAllSearchQuery } from '../../actions/search'

const mapStateToProps = state => ({
  controlShow: state.settings.controlShow,
  tableWidth: state.table.width,
  filteredSchema: state.filteredSchema,
})

const mapDispatchToProps = {
  clearAllSearchQuery,
}

const SearchControl = connect(mapStateToProps, mapDispatchToProps)(SearchControlComponent)
export default SearchControl
