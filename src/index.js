import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import map from 'lodash/map'

import App from './App'
import reducers from './reducers/index'

map(document.getElementsByClassName('reactable'), (element) => {
  let store = createStore(reducers)
  const dataPath = element.getAttribute('data-path')

  return ReactDOM.render(
    <Provider store={store}>
      <App dataPath={dataPath} />
    </Provider>, element
  )
})
