import { connect } from 'react-redux'
import CountersComponent from './Counters.jsx'


const mapStateToProps = state => ({
  filteredSchema: state.filteredSchema,
  filteredItems:  state.filteredItems,
  items:          state.items,
  progressMax:    state.settings.progressMax
})


const Counters = connect(mapStateToProps)(CountersComponent)
export default Counters
