import React from 'react'

const Schema = (props) => {
  const handleChange = (e, key) => {
    console.log("A: ", e.target.checked, key)
    const { schema, updateSchemaOptions } = props
    const { checked } = e.target
    const newOptions =  Object.assign({}, schema[key], { hide: !checked })
    updateSchemaOptions(key, newOptions)
  }

  const renderElement = (key) => {
    const { schema } = props
    const schemaParams = schema[key]
    const value = !schemaParams['hide']
    return (
      <li>
        <input
          type="checkbox"
          onChange={(e) => handleChange(e, key)}
          checked={value}
        />
        {key}
      </li>
    )
  }

  return (
    <div>
      <ul>
        { Object.keys(props.schema).map(key =>
          renderElement(key)
        )}
      </ul>
    </div>
  )
}

export default Schema
