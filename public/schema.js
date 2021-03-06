window.schemaUsers = {
  id: {
    type: "number",
    formatter: function (value, row) {
      return "ID: " + row["id"];
    },
    width: 100,
  },
  created_at: { type: "datetime" },
  first_name: {
    type: "text",
    label: "First Name",
    formatter: function (value, row) {
      return (
        "<a href='/users/" +
        row["id"] +
        " 'target='_top'>" +
        row["first_name"] +
        "</a>"
      );
    },
  },
  last_name: {
    type: "text",
  },
  duration: {
    type: "duration",
  },
  time: {
    type: "time",
  },
  active: {
    type: "boolean",
  },
  date_of_birth: {
    type: "date",
    label: "Date of Birth",
  },
  age: {
    type: "number"
  },
  ip: { type: "text", filterable: false },
  website: { type: "text", visible: true },
  phone_number: { type: "text", visible: true },
  job: { type: "text", visible: false },
  gender: {
    type: "text",
    dictionary: { male: "MALE", female: "FEMALE" },
    formatter: function (value) {
      return this.gender.dictionary[value];
    },
  },
  email: { type: "text", secret: true },
};
