import React from 'react'

import { loginURL } from './config'
import Header from './components/Header'
import { connect } from './common'
import Votes from './components/Votes'
import Attendants from './components/Attendants'
import VoteModal from './components/VoteModal'
import SectionMeetingScanner from './components/SectionMeetingScanner'

class App extends React.Component {
  componentDidMount () {
    this.props.getToken()

    // Register global listner for closing modals via keyboard
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        this.props.closeModal()
      }
    })
  }

  // If token a token is found, try to get info about user (sections, name)
  // This will start a chain of getting other resources like meetings, votes, attendants, etc.
  componentWillReceiveProps (nextProps) {
    if (this.props.token === undefined && nextProps.token !== undefined) {
      this.props.getUserInfo()
    }
  }

  render () {
    const loggedIn = (
      <div id='main'>
        <div className='panel' style={{ maxWidth: '25%' }}>
          <SectionMeetingScanner />
        </div>
        <div className='panel'>
          <Votes />
        </div>
        <div className='panel' style={{ border: 0 }}>
          <Attendants />
        </div>
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
