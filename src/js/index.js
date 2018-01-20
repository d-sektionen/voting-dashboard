import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { Provider } from 'react-redux'
import { store } from 'state'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'index.sass'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
