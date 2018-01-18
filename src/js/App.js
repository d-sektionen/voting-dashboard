import React from 'react'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'custom.css'

import { get, store, queryString } from 'utils'
import { deleteToken } from 'api/token'
import Header from 'components/Header'
import Meetings from 'components/Meetings'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    // Temp fulfix
    if (queryString('token') !== null) {
      store('token', queryString('token'))
      window.history.pushState(null, null, '/')
    }

    this.state = {
      token: get('token'),
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    deleteToken()
    this.setState({ token: null })
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title='Dashboard för D-Cide'
          loggedIn={this.state.token}
          onLogOut={this.handleLogout}
        />
        <div className='row'>
          <div className='col s12 m3 l2'>
            <Meetings />
          </div>
          <div className='col s12 m4'>1</div>
          <div className='col s12 m3 l2'>1</div>
        </div>
      </React.Fragment>
    )
  }
}
