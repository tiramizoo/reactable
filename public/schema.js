window.schemaUsers = {
  id: {
    type: 'integer',
    formatter: function (value, row) { return "ID: " + row['id']},
  },
  first_name: {
    type: 'text',
    label: 'First Name',
    formatter: function (value, row) {
      return "<a href='/users/" + row['id'] + " 'target='_top'>" + row['first_name'] + "</a>"
    },
  },
  last_name: {
    type: 'text',
    hide: false,
  },
  active: {
    type: 'boolean',
    filter: true,
  },
  date_of_birth: {
    type: 'date',
    label: 'Date of Birth'
  },
  gender: { type: 'text' },
  email: { type: 'text' },
}
