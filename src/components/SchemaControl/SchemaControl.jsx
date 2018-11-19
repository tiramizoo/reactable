import React from 'react'

const SchemaControl = (props) => {
  const handleChange = (e, key) => {
    const { schema, updateSchemaOptions } = props
    const { checked } = e.target
    const newOptions = Object.assign({}, schema[key], { hide: !checked })
    updateSchemaOptions(key, newOptions)
  }

  const renderElement = (key) => {
    const { schema } = props
    const schemaParams = schema[key]
    const value = !schemaParams.hide
    return (
      <li key={key}>
        <input
          type="checkbox"
          onChange={e => handleChange(e, key)}
          checked={value}
        />
        {key}
      </li>
    )
  }

  if (!props.schemaControlShow) {
    return null
  }

  return (
    <div>
      <ul>
        { Object.keys(props.schema).map(key =>
          renderElement(key)) }
      </ul>
    </div>
  )
}

export default SchemaControl
