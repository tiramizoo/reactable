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

  const renderElement = (key) => {
    const { filteredSchema } = props
    const value = !!filteredSchema[key]
    return (
      <li key={key}>
        <label htmlFor={key}>
          <input
            id={key}
            type="checkbox"
            onChange={e => handleChange(e, key)}
            checked={value}
          />
          {key}
        </label>
      </li>
    )
  }

  if (!schemaControlShow) {
    return null
  }

  return (
    <div className="schema" style={{ width: tableWidth }}>
      <h2>Schema</h2>
      <ul>
        { Object.keys(schema).map(key => renderElement(key)) }
      </ul>
    </div>
  )
}

export default SchemaControl
