import React from 'react'

const Table = (props) => {
  const {
    items, currentItems,
    limit, offset, setOffset, updateViewport
  } = props

  const scrollContent = (e) => {
    e.preventDefault()

    if (e.nativeEvent.deltaY !== 0) {
      let newOffset = (e.nativeEvent.deltaY > 0) ?
        Math.min(offset + 1, items.length - limit) :
        Math.max(offset - 1, 0)

      setOffset(newOffset)
      updateViewport(items, limit, newOffset)
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Offset</th>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Date of birth</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody onWheel={scrollContent}>
          { currentItems.map(item =>
            <tr key={item.id}>
              <td>{ item._index }</td>
              <td>{ item.id }</td>
              <td>{ item.first_name }</td>
              <td>{ item.last_name }</td>
              <td>{ item.email }</td>
              <td>{ item.gender }</td>
              <td>{ item.date_of_birth }</td>
              <td>{ item.active.toString() }</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
