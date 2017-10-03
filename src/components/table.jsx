import React from 'react'

const Table = (props) => {
  const { filteredItems } = props
  return (
    <div>
      <h1> Table </h1>
      <table>
        <thead>
          <tr>
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
        { filteredItems.map(item =>
          <tr key={item.id}>
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
