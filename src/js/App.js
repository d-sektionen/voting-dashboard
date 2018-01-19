import React from 'react'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'custom.css'

import { queryString } from 'utils'
import { store, login } from 'state'
import Header from 'containers/Header'
import Meetings from 'containers/Meetings'

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
        <div className='section'>
          <div className='row'>
            <div className='col s12 m3 l2'>
              <Meetings />
            </div>
            <div className='col s12 m4'>1</div>
            <div className='col s12 m3 l2'>1</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
