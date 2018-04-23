import React from 'react'
import { loginURL } from 'config'
import Header from 'components/Header'
import {connect} from 'utils'
import Meetings from 'components/Meetings'
import Votes from 'components/Votes'
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
          ? <div id='main'>
            <Meetings />
            {
              this.props.currentMeetingID &&
              <React.Fragment>
                <Votes />
                <Attendants />
                <Scanners />
              </React.Fragment>
            }
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
