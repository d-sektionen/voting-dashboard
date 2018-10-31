import React from 'react'

import { loginURL } from './config'
import Header from './components/Header'
import { connect } from './common'
import Meetings from './components/Meetings'
import Votes from './components/Votes'
import Attendants from './components/Attendants'
import Scanners from './components/Scanners'
import VoteModal from './components/VoteModal'

class App extends React.Component {
  componentDidMount () {
    this.props.getToken()

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        this.props.closeModal()
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.token === undefined && nextProps.token !== undefined) {
      this.props.getUserInfo()
    }
  }

  render () {
    const loggedIn = (
      <div id='main'>
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
    )

    const loggedOut = (
      <div className='login'>
        <a href={loginURL}>Logga in</a>
        <div id='lambda'>λ</div>
      </div>
    )

    return (
      <React.Fragment>
        <div className={`blur-container ${this.props.modalOpen ? 'blur' : ''}`}>
          <Header />
          {this.props.token ? loggedIn : loggedOut}
        </div>
        <VoteModal />
      </React.Fragment>
    )
  }
}

export default connect(App)
