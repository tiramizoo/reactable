import React from 'react'

const Table = (props) => {
  const {
    currentItems, sortItems, schema, setSortDirection, filteredItems,
    limit, offset, setOffset, updateViewport, scrollBarHeight, scrollBarWidth,
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
     let classNames = [key]
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
    updateViewport(filteredItems, limit, offset)
  }


  return (
    <div>
      <table style={{ width: tableWidth}}>
        { Object.keys(schema).map(key =>
            <col key={key} width={schema[key]['width']}></col>,
        )}
        <thead>
          <tr>
            { Object.entries(schema).map(([key, keySchema]) =>
              <th className={columnClassName(key)} key={key} onClick={() => sort(key)}>{key}</th>,
            )}
          </tr>
        </thead>
        <tbody>
          { currentItems.map(item => (
            <tr key={item.id}>
              { Object.entries(schema).map(([key, keySchema]) =>
                <td className={ keySchema['type'] } key={key}>{ item[key] ? item[key].toString() : '' }</td>,
              )}
            </tr>))
          }
        </tbody>
      </table>

      <div className="scroll-bar" onScroll={(e) => scrollContent(e)}  style={{ height: scrollBarHeight, width: scrollBarWidth, top: 30}}>
        <div className="scroll-bar-handle" style={{ height: scrollBarHandleHeight }} />
      </div>

    </div>
  )
}

export default Table
