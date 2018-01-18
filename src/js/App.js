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
      section: null,
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
          section={this.state.section}
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

/* <SessionOpener
          onSessionOpened={this.handleSessionOpened.bind(this)}
          show={newSession}
          closeable={get('session_id', false)} // Only allow closing if session exists.
          onClose={this.handleNewSessionButtonCanceled.bind(this)}
          baseUrl={baseUrl}
          allowedSections={allowedSections}
        /> */

/*

      //   <Grid fluid>
      //     <Row className='show-grid'>
      //       <Col xs={12} md={3}>
      //         <PanelSession
      //           onNewSession={this.handleNewSessionButtonClick.bind(this)}
      //           session_id={this.state.session_id}
      //           admin_token={this.state.admin_token}
      //           voteCode={this.state.voteCode}
      //           baseUrl={baseUrl}
      //         />
      //       </Col>
      //       <Col xs={12} md={6}>
      //         <PanelVoting
      //           onNewVote={this.handleNewVote.bind(this)}
      //           voteCode={this.state.voteCode}
      //           question={this.state.question}
      //           adminHeaders={this.getAdminHeaders()}
      //           baseUrl={baseUrl}
      //           session_id={this.state.session_id}
      //           admin_token={this.state.admin_token}
      //         />
      //       </Col>
      //       <Col xs={12} md={3}>
      //         <PanelRegistrations
      //           adminHeaders={this.getAdminHeaders()}
      //           baseUrl={baseUrl}
      //           session_id={this.state.session_id}
      //           admin_token={this.state.admin_token}
      //         />
      //       </Col>
      //     </Row>
      //   </Grid> */
