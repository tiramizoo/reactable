import { connect } from 'react-redux'
import TableComponent from '../components/table'


const mapStateToProps = state => ({
  items: state.items,
  filteredItems: state.filtered,
})

const Table = connect(
  mapStateToProps,
)(TableComponent)

export default Table
