import React from 'react';

import AddUserForm from './AddUserForm.jsx';
import UserList from './UserList.jsx';

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';

export default class PanelRegistrations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userLength: 0,
            showRemoveUsersModal: false
        };
    }

    handleNewUserAdded(liu_id) {
        return this.addUserToSession(liu_id);
    }

    addUserToSession(liu_id) {

        const data = {
            id: liu_id
        };

        return fetch(this.props.baseUrl + "registration",
            {method: "POST", headers: this.props.adminHeaders, body: JSON.stringify(data)})
            .then(response => response.json())
            .then(responseJSON => {
                return responseJSON.data.status;
            });
    }

    updateUserLength(length) {
        this.setState({
            userLength: length
        });
    }

    removeUserFromSession(liu_id) {

        const data = {id: liu_id, variant: 'single'};

        fetch(this.props.baseUrl + "registration",
            {method: "DELETE", headers: this.props.adminHeaders, body: JSON.stringify(data)});

    }

    handleOpenRemoveUsersModal() {
        this.setState({
            showRemoveUsersModal: true
        })
    }

    handleHideRemoveUsersModal() {
        this.setState({
            showRemoveUsersModal: false
        })
    }

    handleRemoveAllUsersFromSession() {

        const data = {variant: 'all'};

        fetch(this.props.baseUrl + "registration",
            {method: "DELETE", headers: this.props.adminHeaders, body: JSON.stringify(data)});

        this.handleHideRemoveUsersModal();
    }

    render() {

        const addUser = <AddUserForm onSubmit={this.handleNewUserAdded.bind(this)}/>;

        let registeredText = "Registrerade" + (this.state.userLength > 0 ? (" [" + this.state.userLength + "]") : "");

        return (
            <div>
                <Modal
                    show={this.state.showRemoveUsersModal}
                    onHide={this.handleHideRemoveUsersModal.bind(this)}
                    dialogClassName="modal-session-setup"
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
                            className="raised"
                            bsStyle="danger"
                            bsSize="large"
                            block
                            onClick={this.handleRemoveAllUsersFromSession.bind(this)}
                        >
                            Radera alla
                        </Button>
                        <Button
                            className="raised"
                            bsStyle="info"
                            block
                            onClick={this.handleHideRemoveUsersModal.bind(this)}
                        >
                            NEVERMIND
                        </Button>
                    </Modal.Body>
                </Modal>
                <Panel className="panel panel-registrations" footer={addUser}>
                    <h2 className="panel-header">{registeredText}
                        <Button
                            className="raised users-item-button"
                            bsStyle="danger"
                            onClick={this.handleOpenRemoveUsersModal.bind(this)}><Glyphicon
                            glyph="trash"/></Button></h2>
                    <hr />
                    <div className="users-container">
                        <UserList
                            onRemove={this.removeUserFromSession.bind(this)}
                            onNewUserLength={this.updateUserLength.bind(this)}
                            baseUrl={this.props.baseUrl}
                            adminHeaders={this.props.adminHeaders}
                            session_id={this.props.session_id}
                            admin_token={this.props.admin_token}
                            socket={this.props.socket}
                        />
                    </div>
                </Panel>
            </div>
        );
    }
}
