import { connect } from 'react-redux'
import ReactableComponent from './Reactable.jsx'

const mapStateToProps = state => ({
  width: state.table.width,
})

const mapDispatchToProps = () => ({})

const Reactable = connect(mapStateToProps, mapDispatchToProps)(ReactableComponent)
export default Reactable
