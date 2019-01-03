import { connect } from 'react-redux'

import SchemaControlComponent from './SchemaControl.jsx'
import { addToFilteredSchema, removeFromFilteredSchema } from '../../actions/schema'
import { toggleSchemaControl } from '../../actions/settings'


const mapStateToProps = state => ({
  schema: state.schema,
  filteredSchema: state.filteredSchema,
  tableWidth: state.table.width,
  schemaControlShow: state.settings.schemaControlShow,
  containerId: state.settings.container.id,
})

const mapDispatchToProps = {
  addToFilteredSchema,
  removeFromFilteredSchema,
  toggleSchemaControl,
}

const SchemaControl = connect(mapStateToProps, mapDispatchToProps)(SchemaControlComponent)
export default SchemaControl
