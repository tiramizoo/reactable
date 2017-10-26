module.exports = {
  'extends': 'airbnb',
  'rules': {
    semi: ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": [0],
  },
  globals: {
    'window': true,
    'document': true,
    'fetch': true,
    'test': true,
    'expect': true,
  }
}
