import React from 'react';
import FlipMove from 'react-flip-move';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isHovering: false
        };
    }

    render() {


        const voted = this.props.user[2];

        const button = <Button
            bsStyle="danger"
            className="raised users-item-button"
            onClick={() => this.props.onRemove()}
        >
            <Glyphicon glyph="remove"/>
        </Button>;

        return (
            <li
                className={"users-item " + (voted ? "vote" : "novote")}
                onMouseEnter={() => this.setState({isHovering: true})}
                onMouseLeave={() => this.setState({isHovering: false})}
            >
                <text className="users-item-text">{this.props.user[0]}</text>
                {this.state.isHovering ? button : null}
            </li>
        );
    }
}

export default class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.eventSource = null;

        this.state = {
            users: [],
        };
    }

    openEventSource(session_id, admin_token) {
        let url = this.props.baseUrl + "streaming?session_id=";
        url += session_id;
        url += "&admin_token=";
        url += admin_token;

        this.eventSource = new EventSource(url);

        this.eventSource.addEventListener('users', dataRaw => {
                const data = UserList.parseIncomingJSON(dataRaw.data);
                const users = data.map(user => [user.liu_id, user.timestamp, user.vote]);
                this.updateList(users);
            }
        );
    }

    // As the server generates Python-esque JSON, we have to fix it.
    static parseIncomingJSON(data){
        data = data.replace(/'/g, '"');
        data = data.replace(/None/g, "null");
        return JSON.parse(data);
    }

    updateList(users) {
        users.sort();

        let userList = users.map(user => {
            return (
                <User
                    key={user[0]}
                    user={user}
                    onRemove={() => this.props.onRemove(user[0])}
                />
            );
        });

        this.setState({
            users: userList
        });
    }

    initialFetch() {
        fetch(this.props.baseUrl + "registration", {headers: this.props.adminHeaders})
            .then(response => response.json())
            .then(responseJSON => {
                const users = responseJSON.data.users.map(user => [user.liu_id, user.timestamp, user.vote]);
                this.updateList(users);
            })
    }

    closeEventSource() {
        if (this.eventSource)
            this.eventSource.close();
        else {
            this.initialFetch();
        }

    }

    render() {

        this.closeEventSource();
        this.openEventSource(this.props.session_id, this.props.admin_token);
        console.log("render");

        return (
            <ul>
                <FlipMove
                    staggerDurationBy={100}
                    duration={150}
                    enterAnimation="fade"
                    leaveAnimation="fade"
                >
                    {this.state.users}
                </FlipMove>
            </ul>
        );
    }

}
