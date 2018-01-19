import React from 'react'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'custom.css'

import { queryString } from 'utils'
import { store, login } from 'state'
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'
import Users from 'containers/Users'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    // Temp fulfix för att hämta token
    if (queryString('token') !== null) {
      store.dispatch(login(queryString('token')))
      window.history.pushState(null, null, '/')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title='Dashboard för D-Cide'
          className='grey darken-4'
        />
        <div className='row section'>
          <div className='col s12 m3'>
            <Meetings />
          </div>
          <div className='col s12 m5 l6'>1</div>
          <div className='col s12 m4 l3'>
            <Users />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
