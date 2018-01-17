import React from 'react'

import PanelSession from 'components/PanelSession'
import PanelVoting from 'components/PanelVoting'
import PanelRegistrations from 'components/PanelRegistrations'
import SessionOpener from 'components/SessionOpener'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import { get, store, remove } from 'utils'

import 'buttons.css'
import 'index.css'
import 'panel_session.css'
import 'panel_users.css'
import 'panel_voting.css'
import 'qr.css'
import 'style.css'

// import config from './config.json'
// TODO: Fixa senare
const config = {
  baseUrl: 'http://localhost/api/voting/',
  allowedSections: ['d', 'y', 'm', 'i'],
}

const { baseUrl, allowedSections } = config

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      session_id: get('session_id'),
      admin_token: get('admin_token'),
      voteCode: get('voteCode'),
      configured: get('session_id', false),
      section: get('section', 'd'),
    }
  }

  handleSessionOpened(data) {
    this.setState({
      session_id: data.session_id,
      admin_token: data.admin_token,
      section: data.section,
      configured: true,
      voteCode: null,
    })

    remove('voteCode')
    store('session_id', data.session_id)
    store('admin_token', data.admin_token)
    store('section', data.section)
  }

  getAdminHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify({
        session_id: this.state.session_id,
        admin_token: this.state.admin_token,
      }),
    }
  }

  handleNewVote(voteCode) {
    if (voteCode) { // We can also call this when the vote-creation was canceled (i.e. no voteCode)
      this.setState({ voteCode })
      store('voteCode', voteCode, { path: '/', maxAge: 60 * 60 * 10 })
    }
  }

  handleNewSessionButtonClick() {
    this.setState({ configured: false })
  }

  handleNewSessionButtonCanceled() {
    this.setState({ configured: true })
  }

  render() {
    const newSession = !this.state.configured
    console.log(`images/section/${this.state.section}.png`)

    return (
      <div>
        {/* <SessionOpener
          onSessionOpened={this.handleSessionOpened.bind(this)}
          show={newSession}
          closeable={get('session_id', false)} // Only allow closing if session exists.
          onClose={this.handleNewSessionButtonCanceled.bind(this)}
          baseUrl={baseUrl}
          allowedSections={allowedSections}
        /> */}

        <div className='page-header'>
          <h1 style={{ marginTop: '15px' }}>Dashboard för D-Cide</h1>
          <small className='subtitle'>Skapat av D-sektionens WebbU 16-17</small>
        </div>
        <div className='section-logo' style={{ backgroundImage: `url(images/section/${this.state.section}.png)` }} />

        {/*

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
      //   </Grid> */}
      </div>
    )
  }
}
