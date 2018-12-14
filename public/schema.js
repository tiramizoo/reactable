window.schemaUsers = {
  id: {
    type: 'number',
    formatter: function (value, row) { return "ID: " + row['id']},
  },
  first_name: {
    type: 'text',
    label: 'First Name',
    formatter: function (value, row) {
      return "<a href='/users/" + row['id'] + " 'target='_top'>" + row['first_name'] + "</a>"
    },
  },
  duration: {
    type: 'duration',
  },
  time: {
    type: 'time',
  },
  active: {
    type: 'boolean',
    filter: true,
  },
  date_of_birth: {
    type: 'date',
    label: 'Date of Birth',
  },

  gender: { type: 'text' },
  email: { type: 'text' },
  created_at: { type: 'datetime' },
}
