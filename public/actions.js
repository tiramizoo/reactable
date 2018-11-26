window.actionsUser = {
  edit: {
    onClick: function (row, e) { console.log('sending to server...', row) },
    label: 'Edit',
    className: 'test-edit',
    disabled: function (row) { return row.id % 2 === 0 }
  },
  delete: {
    onClick: function (row, e) { console.log('delete...', row) },
  }
}
