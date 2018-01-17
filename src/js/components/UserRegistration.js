import React from 'react'

import AddUserForm from 'components/AddUserForm'
import UserList from 'components/UserList'


export default class UserRegistration extends React.Component {
  constructor(props) {
    super(props)
    this.hash = 'invalidhash'

    this.state = {
      users: [],
    }
  }

  handleNewUserAdded(liuID) {
    return this.addUserToSession(liuID)
  }

  addUserToSession(liuID) {
    const data = {
      id: liuID,
    }

    return fetch(
      `${this.props.baseUrl}registration`,
      { method: 'POST', headers: this.props.adminHeaders, body: JSON.stringify(data) }
    )
      .then(response => response.json())
      .then(responseJSON => responseJSON.data.status)
  }

  updateUsers() {
    let url = `${this.props.baseUrl}sync?session_id=`
    url += this.props.session_id
    url += '&admin_token='
    url += this.props.admin_token
    url += '&hash='
    url += this.hash
    url += '&type=users'

    return fetch(url, { method: 'GET' })
      .then(dataRaw => dataRaw.json())
      .then(dataJSON => {
        if (dataJSON.data.status === 'already updated') return
        this.hash = dataJSON.data.hash
        this.setState({
          userLength: dataJSON.data.users.length,
        })
        return dataJSON // Data is then returned to UserList call for list-updating.
      })
  }

  removeUserFromSession(liuID) {
    const data = { id: liuID, variant: 'single' }

    fetch(
      `${this.props.baseUrl}registration`,
      { method: 'DELETE', headers: this.props.adminHeaders, body: JSON.stringify(data) }
    )
  }

  handleOpenRemoveUsersModal() {
    this.setState({
      showRemoveUsersModal: true,
    })
  }

  handleHideRemoveUsersModal() {
    this.setState({
      showRemoveUsersModal: false,
    })
  }

  // TODO Confirmation before removal
  handleRemoveAllUsersFromSession() {
    const data = { variant: 'all' }

    fetch(
      `${this.props.baseUrl}registration`,
      { method: 'DELETE', headers: this.props.adminHeaders, body: JSON.stringify(data) }
    )

    this.handleHideRemoveUsersModal()
  }

  render() {
    const addUser = <AddUserForm onSubmit={this.handleNewUserAdded.bind(this)} />

    const registeredText = `Registrerade${this.state.userLength > 0 ? (` [${this.state.userLength}]`) : ''}`

    return (
      <div>
        <Modal
          show={this.state.showRemoveUsersModal}
          onHide={this.handleHideRemoveUsersModal.bind(this)}
          dialogClassName='modal-session-setup'
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Radera alla registrerade användare
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Vill du fortsätta?</p>
            <hr />

            <Button
              className='raised'
              bsStyle='danger'
              bsSize='large'
              block
              onClick={this.handleRemoveAllUsersFromSession.bind(this)}
            >
                            Radera alla
            </Button>
            <Button
              className='raised'
              bsStyle='info'
              block
              onClick={this.handleHideRemoveUsersModal.bind(this)}
            >
                            NEVERMIND
            </Button>
          </Modal.Body>
        </Modal>
        <Panel className='panel panel-registrations' footer={addUser}>
          <h2 className='panel-header'>{registeredText}
            <Button
              className='raised button-remove-users'
              bsStyle='danger'
              onClick={this.handleOpenRemoveUsersModal.bind(this)}
            >
              <Glyphicon glyph='trash' />
            </Button>
          </h2>
          <hr />
          <div className='users-container'>
            <UserList
              onRemove={this.removeUserFromSession.bind(this)}
              onUpdate={this.updateUsers.bind(this)}
              baseUrl={this.props.baseUrl}
              adminHeaders={this.props.adminHeaders}
              session_id={this.props.session_id}
              admin_token={this.props.admin_token}
            />
          </div>
        </Panel>
      </div>
    )
  }
}
