import { connect } from 'react-redux'
import SidebarComponent from './Sidebar.jsx'

const mapStateToProps = state => ({
  searchQueryOr: state.searchQueryOr,
  searchQueryAnd: state.searchQueryAnd,
  height: state.limit * 30,
  schema: state.schema,
  filteredSchema: state.filteredSchema,
})

const mapDispatchToProps = () => ({})

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)
export default Sidebar
