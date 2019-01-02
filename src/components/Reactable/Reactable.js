import { connect } from 'react-redux'
import ReactableComponent from './Reactable.jsx'

import { updateTableWidth } from '../../actions/settings'


const mapStateToProps = state => ({
  width:     state.table.width,
  container: state.settings.container,
})

const mapDispatchToProps = dispatch => (
  {
    updateTableWidth: tableWidth => dispatch(updateTableWidth(tableWidth)),
  }
)

const Reactable = connect(mapStateToProps, mapDispatchToProps)(ReactableComponent)
export default Reactable
