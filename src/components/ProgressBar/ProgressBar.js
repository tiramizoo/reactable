import { connect } from 'react-redux'
import ProgressBarComponent from './ProgressBar.jsx'


const mapStateToProps = state => ({
  items:          state.items,
  noData:         state.settings.noData,
  progressMax:    state.settings.progressMax
})


const ProgressBar = connect(mapStateToProps)(ProgressBarComponent)
export default ProgressBar
