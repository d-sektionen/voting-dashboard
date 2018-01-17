import React from 'react'

import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'

import QR from './QR.jsx'

export default class PanelSession extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showToken: false,
      showOfficialSessionConfig: false,
      superSecretAuth: '',
      validAuth: true,
    }
  }

  handleShowToken() {
    this.setState({
      showToken: true,
    })
  }

  handleHideToken() {
    this.setState({
      showToken: false,
    })
  }

  handleOpenSetOfficialModal() {
    this.setState({
      showOfficialSessionConfig: true,
    })
  }

  handleSubmitOfficialSession(e) {
    e.preventDefault()

    const url = `${'https://d-sektionen.se/wp-content/themes/d-sektionen_design/includes/' +
            'voting-add-option.php?auth='}${  this.state.superSecretAuth  }&session_id=${  this.props.session_id}`

    fetch(url, { mode: 'no-cors', method: 'GET' })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.code === 200) {
          this.handleHideSetOfficialModal()
          this.setState({
            validAuth: true,
          })
        } else {
          this.setState({
            validAuth: false,
          })
        }
      })
  }

  handleHideSetOfficialModal() {
    this.setState({
      showOfficialSessionConfig: false,
    })
  }

  handleWriteToAuth(e) {
    this.setState({
      superSecretAuth: e.target.value,
    })
  }

  render() {
    const newSessionButton =
          (<Button
            bsStyle='success'
            onClick={this.props.onNewSession}
            className='raised panel-session-new-button'
          >
            <Glyphicon glyph='repeat' /> Byt Session
           </Button>)

    const officialSessionButton =
          (<Button
            bsStyle='info'
            className='panel-session-official-button'
            onClick={this.handleOpenSetOfficialModal.bind(this)}
          >
            <Glyphicon glyph='cloud' />
           </Button>)

    const buttonGroup =
          (<ButtonGroup
            bsSize='large'
            className='panel-session-button-group'
          >
            {newSessionButton}{officialSessionButton}
          </ButtonGroup>)

    const adminToken = this.state.showToken ? <p>{this.props.admin_token}</p> :
      (<p
id="panel-session-admin_token"
style={{
                backgroundColor: "#282828",
                borderRadius: "2px",
                color: "white",
                width: "90px",
                margin: "0 auto",
            }}
        >
                • • • • • • • • •
        </p>)

    return (
      <div>
            <Modal
                show={this.state.showOfficialSessionConfig}
                onHide={this.handleHideSetOfficialModal.bind(this)}
                dialogClassName='official-session-modal'
              >
                <Modal.Body>
                    <form>
                        <FormGroup
                            validationState={this.state.validAuth ? null : 'error'}
                          >
                            <InputGroup>
                                <FormControl
                                    type='text'
                                    value={this.state.superSecretAuth}
                                    placeholder='Authentication'
                                    onChange={this.handleWriteToAuth.bind(this)}
                                  />
                                <InputGroup.Button>
                                    <Button
                                        type='submit'
                                        id='official-session-submit-button'
                                        bsStyle='success'
                                        onClick={this.handleSubmitOfficialSession.bind(this)}
                                      ><Glyphicon glyph='upload' />
                                      </Button>
                                  </InputGroup.Button>
                              </InputGroup>
                          </FormGroup>
                      </form>
                  </Modal.Body>
              </Modal>
            <Panel header={buttonGroup} className='panel panel-session'>
                <h3 style={{ marginTop: '5px' }}>Session ID</h3>
                <p>{this.props.session_id}</p>
                <hr className='panel-session-hr' />
                <div
                    onMouseEnter={this.handleShowToken.bind(this)}
                    onMouseLeave={this.handleHideToken.bind(this)}
                  >
                    <h3>Admin Token</h3>
                    {adminToken}
                  </div>
                <hr className='panel-session-hr' />
                <h3>Vote Code</h3>
                <p>{this.props.vote_code || '-'}</p>
                <hr className='panel-session-hr' />
                <QR
                    baseUrl={this.props.baseUrl}
                    session_id={this.props.session_id}
                    admin_token={this.props.admin_token}
                  />
              </Panel>
          </div>
    )
  }
}
