import React from 'react'

const Table = (props) => {
  const {
    items, currentItems, sortItems, schema, setSortDirection,
    limit, offset, setOffset, updateViewport, scrollBarHeight, scrollBarWidth, scrollBarHandleHeight
  } = props


  const scrollContent = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const offsetMax = items.length - limit // 100 - 20 = 80

    const scrollableHeight = scrollBarHandleHeight - scrollBarHeight // 3000 - 600 = 2400

    const scrollTop = Math.min(scrollableHeight, e.target.scrollTop) // ios only: reject values > 2400

    const newOffset = offsetMax - Math.round((scrollableHeight - Math.max(0, scrollTop)) / 30)

    setOffset(newOffset)
    updateViewport(items, limit, newOffset)
  }

  const toggleDirection = (key) => {
    if (!schema[key].direction) return 'asc'
    if (schema[key].direction === 'desc') return 'asc'
    return 'desc'
  }

  const sort = (key) => {
    const direction = toggleDirection(key)
    setSortDirection(key, direction)
    sortItems(key, schema[key].type, direction)
    updateViewport(items, limit, offset)
  }


  return (
    <div>
      <table>
        { Object.keys(schema).map(key =>
            <col key={key} width={schema[key]['width']}></col>,
        )}
        <thead>
          <tr>
            { Object.keys(schema).map(key =>
              <th key={key} onClick={() => sort(key)}>{key}</th>,
            )}
          </tr>
        </thead>
        <tbody>
          { currentItems.map(item => (
            <tr key={item.id}>
              { Object.keys(schema).map(key =>
                <td key={key}>{ item[key].toString() }</td>,
              )}
            </tr>))
          }
        </tbody>
      </table>

      <div className="scroll-bar" onScroll={scrollContent}  style={{ height: scrollBarHeight, width: scrollBarWidth, top: 30}}>
        <div className="scroll-bar-handle" style={{ height: scrollBarHandleHeight }} />
      </div>

    </div>
  )
}

export default Table
