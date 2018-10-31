import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'unstated'

import App from './App'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')
)
