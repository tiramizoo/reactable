import React from 'react'

const SchemaControl = (props) => {
  const { schemaControlShow, tableWidth, schema } = props

  const handleChange = (e, key) => {
    const { addToFilteredSchema, removeFromFilteredSchema } = props
    const { checked } = e.target

    if (checked) {
      addToFilteredSchema(key)
    } else {
      removeFromFilteredSchema(key)
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
        <label htmlFor={key}>
          {key}
        </label>
        <input
          id={key}
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
    <div className='schema'>
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
