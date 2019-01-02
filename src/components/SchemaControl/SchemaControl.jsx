import React from 'react'
import { getPrefix } from '../../helpers/utilities'

const SchemaControl = (props) => {
  const { schemaControlShow, containerId, schema } = props

  const prefix = (column) => {
    return getPrefix(containerId, 'schema', column)
  }

  const handleChange = (e, key) => {
    const { addToFilteredSchema, removeFromFilteredSchema, filteredSchema } = props
    const { checked } = e.target

    if (checked) {
      addToFilteredSchema(key)
    } else {
      if (Object.keys(filteredSchema).length > 1) {
        removeFromFilteredSchema(key)
      } else {
        alert("At least 1 column must be visible")
      }
    }
  }

  const handleToggleSchemaControl = (e) => {
    e.preventDefault()
    const { toggleSchemaControl } = props
    toggleSchemaControl()
  }

  const renderElement = (key) => {
    const { filteredSchema } = props
    const value = !!filteredSchema[key]
    return (
      <li key={key}>
        <label htmlFor={prefix(key)}>
          {schema[key].label || key}
        </label>
        <input
          id={prefix(key)}
          type="checkbox"
          onChange={e => handleChange(e, key)}
          checked={value}
        />
      </li>
    )
  }

  if (!schemaControlShow) {
    return null
  }

  return (
    <div className='schema box'>
      <div className='header'>
        <h2>Schema</h2>
        <button className='close' onClick={(e) => handleToggleSchemaControl(e)}></button>
      </div>
      <div className='body'>
        <ul>
          { Object.keys(schema).map(key => renderElement(key)) }
        </ul>
      </div>
    </div>
  )
}

export default SchemaControl
