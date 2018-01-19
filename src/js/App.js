import React from 'react'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'custom.css'

import queryString from 'query-string'
import { store, setToken } from 'state'
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'
import Voting from 'containers/Voting'
import Users from 'containers/Users'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    const { token } = queryString.parse(window.location.search)

    if (token) {
      store.dispatch(setToken(token))
      window.history.pushState(null, null, '/dashboard')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title='Dashboard för D-Cide'
          className='grey darken-4'
        />
        <div className='row section panel-container'>
          <div className='col s12 m3'>
            <Meetings />
          </div>
          <div className='col s12 m5 l6'>
            <Voting />
          </div>
          <div className='col s12 m4 l3'>
            <Users />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
