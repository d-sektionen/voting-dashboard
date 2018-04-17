import React from 'react'
import { loginURL } from 'config'
import Header from 'components/Header'
import {connect} from 'utils'
import Meetings from 'components/Meetings'
import Votes from 'components/votes'
import Attendants from 'components/Attendants'
import Scanners from 'components/Scanners'

class App extends React.Component {
  componentDidMount () {
    this.props.getToken()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.token === undefined && nextProps.token !== undefined) {
      this.props.getUserInfo()
    }
  }

  render () {
    return (
      <React.Fragment>
        <Header />
        {this.props.token
          ? <div className='row main'>
            <div className='col s12 m3'>
              <Meetings />
            </div>
            <div className='col s12 m5 l6'>
              <Votes />
            </div>
            <div className='col s12 m4 l3'>
              <Attendants />
              <Scanners />
            </div>
          </div>
          // Logged out, show login text
          : <div>
            <h5 className='center-align'>
              <a href={loginURL}>Logga in </a>
              för använda D-Cides Dashboard
            </h5>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default connect(App)
