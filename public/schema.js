window.schemaUsers = {
  id: {
    type: 'integer',
    width: 70,
    formatter: function (row) { return "ID: " + row['id']}
  },
  first_name: {
    type: 'text',
    formatter: function (row) {
      return "<a href='/users/" + row['id'] + " 'target='_top'>" + row['first_name'] + "</a>"
    },
  },
  last_name: {
    type: 'text',
    hide: true,
  },
  active: {
    type: 'boolean',
    filter: false,
  },
  date_of_birth: {
    type: 'date',
  },
  gender: { type: 'text' },
  email: { type: 'text' },
}
