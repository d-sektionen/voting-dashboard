import React from 'react'

import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'


class LoadOldSessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionId: '',
      adminToken: '',
      valid: true,
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!!this.state.sessionId && !!this.state.adminToken) {
      const validP = this.props.onCompleted(this.state.sessionId, this.state.adminToken)
      validP.then((valid) => {
        this.setState({ valid })
      })
    }
  }

  handleSessionIdUpdate(e) {
    this.setState({
      sessionId: e.target.value,
      valid: true,
    })
  }

  handleAdminTokenUpdate(e) {
    this.setState({
      adminToken: e.target.value,
      valid: true,
    })
  }

  handleBack() {
    this.props.onBack()
  }

  render() {
    const feedback = !this.state.valid ? <FormControl.Feedback /> : ''

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup
          controlId='session_id'
          validationState={this.state.valid ? null : 'error'}
        >

          <FormControl
            type='text'
            value={this.state.sessionId}
            placeholder='Session-id'
            onChange={this.handleSessionIdUpdate.bind(this)}
          />
          {feedback}

        </FormGroup>

        <FormGroup
          controlId='admin_token'
          validationState={this.state.valid ? null : 'error'}
        >

          <FormControl
            type='text'
            value={this.state.adminToken}
            placeholder='Admin-token'
            onChange={this.handleAdminTokenUpdate.bind(this)}
          />
          {feedback}

        </FormGroup>

        <Button type='submit' bsStyle='success' bsSize='large' block className='raised'>
                    Ladda in
        </Button>

        <Button onClick={this.handleBack.bind(this)} block bsStyle='info' className='raised'>Tillbaka</Button>

      </form>
    )
  }
}


export default class SessionOpener extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: this.props.show,
      loadingOldSession: false,
      noSectionSelected: false, // Sets to true when a session tries to open with no chosenSelection.
      chosenSection: null,
    }
  }

  close() {
    this.setState({ showModal: false })
  }

  handleLoadOld() {
    this.setState({ loadingOldSession: !this.state.loadingOldSession })
  }

  sendValidateSessionRequest(session_id, admin_token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: JSON.stringify({ session_id, admin_token }),
    }

    return fetch(`${this.props.baseUrl}session`, { method: 'GET', headers })
      .then(response => response.json())
      .then(responseJson => responseJson.data)
  }

  handleSubmitLoadOld(session_id, admin_token) {
    const validP = this.sendValidateSessionRequest(session_id, admin_token)

    return validP.then(data => {
      if (data.status === 'valid') {
        this.handleSessionOpened(session_id, admin_token, data.section)
        return true
      }
      return false
    })
  }

  sendNewSessionRequest() {
    const headers = {
      'Content-Type': 'application/json',
    }

    const body = JSON.stringify({
      section: this.state.chosenSection,
    })

    return fetch(`${this.props.baseUrl}session`, { method: 'POST', headers, body })
      .then(response => response.json())
      .then(responseJson => {
        const data = responseJson.data
        this.handleSessionOpened(data.session_id, data.admin_token, data.section)
      })
  }

  handleSessionOpened(session_id, admin_token, section) {
    this.setState({
      loadingOldSession: false,
    })
    const data = { session_id, admin_token, section }
    this.props.onSessionOpened(data)
  }

  handleCreateNew() {
    if (this.state.chosenSection === null) {
      this.setState({
        noSectionSelected: true,
      })
      return
    }

    this.sendNewSessionRequest()
  }

  handleClosing() {
    this.props.onClose()
    this.setState({
      loadingOldSession: false,
    })
  }

  render() {
    const title = 'Öppna en Session'

    let header
    if (this.props.closeable) {
      header =
              (<Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>)
    } else {
      header =
              (<Modal.Header>
                <Modal.Title>{title}</Modal.Title>
               </Modal.Header>)
    }

    const noSectionSelectedStyle = {
      boxShadow: '0 3px 5px 0 red',
    }

    const sectionChooser = (
      <ButtonGroup
        bsSize='large'
        className='session-opener-section-chooser'
        style={this.state.noSectionSelected ? noSectionSelectedStyle : null}
      >
        {this.props.allowedSections.map(section => {
                    const selectedSection = section === this.state.chosenSection ? ' selected' : ' raised'
                    return (
                      <Button
                        onClick={() => this.setState({
                                chosenSection: section,
                                noSectionSelected: false,
                            })}
                        className={`btn-section-chooser${selectedSection}`}
                        style={{
                                backgroundImage: `url(https://d-sektionen.se/downloads/logos/${section}-sek_logo.png)`,
                            }}
                        key={section}
                      />
                    )
                })}
      </ButtonGroup>
    )

    let body
    if (this.state.loadingOldSession) {
      body =
              (<Modal.Body>
                <LoadOldSessionForm
                  onCompleted={this.handleSubmitLoadOld.bind(this)}
                  onBack={this.handleLoadOld.bind(this)}
                />
               </Modal.Body>)
    } else {
      body =
              (<Modal.Body>
                <p>Du kan välja att antingen generera en helt ny Session, eller ladda in en gammal.</p>
                <hr />
                {sectionChooser}
                <Button
                  onClick={this.handleCreateNew.bind(this)}
                  bsStyle='success'
                  className='raised'
                  bsSize='large'
                  block
                >
                        Generera ny
                </Button>
                <Button
                  onClick={this.handleLoadOld.bind(this)}
                  bsStyle='info'
                  className='raised'
                  block
                >
                        Ladda in gammal
                </Button>
               </Modal.Body>)
    }

    let modal
    if (this.props.closeable) {
      modal =
              (<Modal
                show={this.props.show}
                dialogClassName='modal-session-setup'
                onHide={this.handleClosing.bind(this)}
              >
                {header}
                {body}
              </Modal>)
    } else {
      modal =
              (<Modal
                show={this.props.show}
                dialogClassName='modal-session-setup'
              >
                {header}
                {body}
               </Modal>)
    }

    return (
      <div>
        {modal}
      </div>
    )
  }
}

