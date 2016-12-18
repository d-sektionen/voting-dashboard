import React from 'react';
import FlipMove from 'react-flip-move';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


class User extends React.Component {

    constructor(props) {
        super(props);

        this.savedSession = this.props.session_id;

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
        this.savedSession = null;

        this.state = {
            users: [],
        };
    }

    openEventSource() {
        if (this.eventSource)
            this.closeEventSource();

        let url = this.props.baseUrl + "stream?channel=";
        url += this.props.session_id;
        url += "&admin_token=";
        url += this.props.admin_token;

        this.eventSource = new EventSource(url);

        this.eventSource.addEventListener('users', dataRaw => {
                const data = JSON.parse(dataRaw.data);
                const users = data.map(user => [user.liu_id, user.timestamp, user.vote]);
                this.updateList(users);
            }
        );
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

    componentWillUnmount() {
        this.closeEventSource();
    }

    closeEventSource() {
        if (this.eventSource)
            this.eventSource.close();
    }

    render() {

        // How we know a new session was opened, ergo we need to open an eventSource at this
        if (this.props.session_id != this.savedSession) {
            this.openEventSource();
            this.initialFetch();
            this.savedSession = this.props.session_id;
        }

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
