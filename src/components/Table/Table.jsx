import React from 'react'

const Table = (props) => {
  const {
    items, currentItems,
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


  return (
    <div>
      <table style={{ width: 800}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          { currentItems.map(item => (
            <tr key={item.id}>
              <td>{ item.id }</td>
              <td>{ item.first_name }</td>
              <td>{ item.last_name }</td>
            </tr>))
          }
        </tbody>
      </table>

      <div className="scroll-bar" onScroll={scrollContent}  style={{ height: scrollBarHeight, width: scrollBarWidth, top: 30}}>
        <div className="scroll-bar-handle" style={{ height: scrollBarHandleHeight}} />
      </div>

    </div>
  )
}

export default Table
