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
        const button = <Button
            bsStyle="danger"
            className="raised users-item-button"
            onClick={() => this.props.onRemove(this.props.user[0])}
        >
            <Glyphicon glyph="remove"/>
        </Button>;

        // voted ? "vote" : "novote"
        return (
            <li
                className={"users-item noshow"}
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

        this.intervalId = null;
        this.savedSession = null;

        this.state = {
            users: [],
        };

        this.props.socket.on('user_update', data => {
            const users = data.users.map(user => [user.liu_id, user.timestamp, user.vote]);
            this.updateList(users);
            this.props.onNewUserLength(data.users.length);
        });
    }

    handleRemove(user) {
        this.props.onRemove(user);
    }

    updateList(users) {
        users.sort();

        let userList = users.map(user => {
            return (
                <User
                    key={user[0]}
                    user={user}
                    onRemove={this.handleRemove.bind(this)}
                />
            );
        });

        this.setState({
            users: userList
        });
    }

    render() {

        if (this.props.session_id != this.savedSession) {
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
