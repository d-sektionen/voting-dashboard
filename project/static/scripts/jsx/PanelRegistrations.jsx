import React from 'react';

import AddUserForm from './AddUserForm.jsx';
import UserList from './UserList.jsx';

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class PanelRegistrations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
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

    removeUserFromSession(liu_id) {

        const data = {id: liu_id, variant: 'single'};

        fetch(this.props.baseUrl + "registration",
            {method: "DELETE", headers: this.props.adminHeaders, body: JSON.stringify(data)});

    }

    removeAllUsersFromSession() {

        const data = {variant: 'all'};

        fetch(this.props.baseUrl + "registration",
            {method: "DELETE", headers: this.props.adminHeaders, body: JSON.stringify(data)});

    }
    render() {

        const addUser = <AddUserForm onSubmit={this.handleNewUserAdded.bind(this)}/>;

        return (
            <Panel className="panel panel-registrations" footer={addUser}>
                <h2 className="panel-header">Registrerade
                    <Button
                        className="raised users-item-button"
                        bsStyle="danger"
                        onClick={this.removeAllUsersFromSession.bind(this)}><Glyphicon glyph="trash"/></Button></h2>
                <hr />
                <div className="users-container">
                    <UserList
                        onRemoveAll={this.removeAllUsersFromSession.bind(this)}
                        onRemove={this.removeUserFromSession.bind(this)}
                        baseUrl={this.props.baseUrl}
                        adminHeaders={this.props.adminHeaders}
                        session_id={this.props.session_id}
                        admin_token={this.props.admin_token}
                    />
                </div>
            </Panel>
        );
    }
}
