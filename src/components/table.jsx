import React from 'react'

const Table = (props) => {
  const {
    filteredItems, currentItems, nextItem, prevousItem, items, changeOffset,
    setLimit, limit, setOffset, offset,
  } = props
  const updateOffset = (e) => {
    setOffset(e.target.value)
    changeOffset(filteredItems, e.target.value, limit)
  }
  const updateLimit = (e) => {
    setLimit(e.target.value)
    changeOffset(filteredItems, offset, e.target.value)
  }

  return (
    <div>
      <h1> ReacTable </h1>
      <div>
        <button onClick={() => nextItem(filteredItems, currentItems)}> +1 </button>
        <button onClick={() => prevousItem(filteredItems, currentItems)}> -1 </button>
        <h3>{ currentItems.length } / { items.length } </h3>
        <h3>Limit: {limit}</h3>
        <span> Limit: <input onChange={updateLimit} value={limit} type="number" min="1" /></span>
        <span> Offset: <input onChange={updateOffset} value={offset} type="number" min="0" /></span>
      </div>
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
        <tbody>
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
