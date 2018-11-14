window.schemaUsers = {
  id: { type: 'integer', width: 70, formatter: function (row) { return "ID: " + row['id']}},
  first_name: {
    type: 'text',
    formatter: function (row) {
      return "<a href='/users/" + row['id'] + " 'target='_top'>" + row['first_name'] + "</a>"
    },
  },
  last_name: { type: 'text', formatter: function (row) { return row['last_name'] }},
  active: { type: 'boolean', formatter: function (row) { return row['active'] }},
  date_of_birth: { type: 'date', formatter: function (row) { return row['date_of_birth'] }},
  gender: { type: 'text', formatter: function (row) { return row['gender'] }},
  email: { type: 'text', formatter: function (row) { return row['email'] }},
}
