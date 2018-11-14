import { connect } from 'react-redux'

import SchemaComponent from './Schema.jsx'
import { updateSchemaOptions } from '../../../actions/schema'

const mapStateToProps = state => ({
  schema: state.schema,
})

const mapDispatchToProps = dispatch => ({
  updateSchemaOptions: (key, options) => {
    dispatch(updateSchemaOptions(key, options))
  },
})

const Schema = connect(mapStateToProps, mapDispatchToProps)(SchemaComponent)
export default Schema
