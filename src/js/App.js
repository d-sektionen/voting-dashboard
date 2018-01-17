import React from 'react'

// import PanelSession from 'components/PanelSession'
// import PanelVoting from 'components/PanelVoting'
// import PanelRegistrations from 'components/PanelRegistrations'
// import SessionOpener from 'components/SessionOpener'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons.css'
import 'custom.css'

import Header from 'components/Header'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      section: null, // get('section', 'd'),
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Header title='Dashboard för D-Cide' section='d' liuID='jeswr740' />
        <div className='row'>
          <div className='col s12 m4'>1</div>
          <div className='col s12 m4'>1</div>
          <div className='col s12 m4'>1</div>
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
