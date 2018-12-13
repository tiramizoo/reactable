import { connect } from 'react-redux'

import SearchControlComponent from './SearchControl.jsx'
import { clearAllSearchQuery } from '../../actions/search'
import { toggleSearchControl } from '../../actions/settings'

const mapStateToProps = state => ({
  controlShow: state.settings.controlShow,
  tableWidth: state.table.width,
  filteredSchema: state.filteredSchema,
})

const mapDispatchToProps = {
  clearAllSearchQuery, toggleSearchControl,
}

const SearchControl = connect(mapStateToProps, mapDispatchToProps)(SearchControlComponent)
export default SearchControl
