import { connect } from 'react-redux'

import SchemaControlComponent from './SchemaControl.jsx'
import { updateSchemaOptions } from '../../actions/schema'

const mapStateToProps = state => ({
  schema: state.schema,
  schemaControlShow: state.settings.schemaControlShow,
})

const mapDispatchToProps = dispatch => ({
  updateSchemaOptions: (key, options) => {
    dispatch(updateSchemaOptions(key, options))
  },
})

const SchemaControl = connect(mapStateToProps, mapDispatchToProps)(SchemaControlComponent)
export default SchemaControl
