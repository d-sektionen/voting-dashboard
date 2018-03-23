import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'index.sass'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import queryString from 'query-string'
import { store, setToken } from 'state'
import App from 'App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

// Collect the token from the url after the user logged in from LiU
const { token } = queryString.parse(window.location.search)

if (token) {
  store.dispatch(setToken(token))
  window.history.replaceState(null, null, window.location.pathname)
}
