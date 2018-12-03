import { connect } from 'react-redux'

import ScrollBarComponent from './ScrollBar.jsx'
import { setLimit, setOffset, updateViewport } from '../../actions/items'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({})

const ScrollBar = connect(mapStateToProps, mapDispatchToProps)(ScrollBarComponent)

export default ScrollBar
