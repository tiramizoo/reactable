import React from 'react'

import { defaultFormatter } from '../../helpers/defaultFormaters'

const Table = (props) => {
  const {
    currentItems, sortItems, schema, setSortDirection, filteredItems,
    limit, setOffset, updateViewport, scrollBarHeight, scrollBarWidth,
    scrollBarHandleHeight, tableWidth,
  } = props


  const scrollContent = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const offsetMax = filteredItems.length - limit // 100 - 20 = 80
    const scrollableHeight = scrollBarHandleHeight - scrollBarHeight // 3000 - 600 = 2400
    const scrollTop = Math.min(scrollableHeight, e.target.scrollTop) // ios only: reject values > 2400
    const newOffset = offsetMax - Math.round((scrollableHeight - Math.max(0, scrollTop)) / 30)

    setOffset(newOffset)
    updateViewport(filteredItems, limit, newOffset)
  }

  const toggleDirection = (key) => {
    if (!schema[key].direction) return 'asc'
    if (schema[key].direction === 'desc') return 'asc'
    return 'desc'
  }

  const columnClassName = (key) => {
    const classNames = [key]
    if (schema[key].direction) {
      classNames.push('sorted')
      classNames.push(schema[key].direction)
    }
    return classNames.join(' ')
  }

  const sort = (key) => {
    const direction = toggleDirection(key)
    setSortDirection(key, direction)
    sortItems(key, schema[key].type, direction)
    setOffset(0)
    updateViewport(filteredItems, limit, 0)
  }

  const cellHtml = (row, key, schemaParams) => {
    const formatter = schemaParams.formatter || defaultFormatter(schemaParams.type, key)
    const html = row[key] !== 'undefined' ? formatter(row) : ''
    return { __html: html }
  }

  const hideColumn = (schemaParams) => {
    return schemaParams.hide !== 'undefined' && schemaParams.hide === true
  }

  const columnHeader = (key, schemaParams) => {
    if (hideColumn(schemaParams)) {
      return null
    }
    return (
      <th className={columnClassName(key)} key={key} onClick={() => sort(key)}>
        {key}
      </th>
    )
  }

  const columnBody = (row, key, schemaParams) => {
    if (hideColumn(schemaParams)) {
      return null
    }
    return (
      <td
        className={schemaParams.type}
        key={key}
        dangerouslySetInnerHTML={cellHtml(row, key, schemaParams)}
      />
    )
  }

  const renderHeader = () => {
    return (
      <tr>
        { Object.entries(schema).map(([key, keySchema]) =>
          columnHeader(key, keySchema))
        }
      </tr>
    )
  }

  const renderRow = (item) => {
    return (
      <tr key={item.id}>
        { Object.entries(schema).map(([key, keySchema]) =>
          columnBody(item, key, keySchema))
        }
      </tr>
    )
  }

  return (
    <div>
      <table style={{ width: tableWidth }}>
        { Object.keys(schema).map(key =>
          <col key={key} width={schema[key].width} />)
        }
        <thead>
          { renderHeader() }
        </thead>
        <tbody>
          { currentItems.map(item => renderRow(item)) }
        </tbody>
      </table>

      <div
        className="scroll-bar"
        onScroll={e => scrollContent(e)}
        style={{ height: scrollBarHeight, width: scrollBarWidth, top: 30 }}
      >
        <div className="scroll-bar-handle" style={{ height: scrollBarHandleHeight }} />
      </div>
    </div>
  )
}

export default Table
