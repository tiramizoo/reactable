module.exports = {
  'extends': 'airbnb',
  'rules': {
    semi: ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": [0],
    "function-paren-newline": ["error", "never"],
    "no-underscore-dangle": ["warn"]
  },
  globals: {
    'window': true,
    'document': true,
    'fetch': true,
    'test': true,
    'expect': true,
  }
}
