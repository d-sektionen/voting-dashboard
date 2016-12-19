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

        this.intervalId = null;
        this.savedSession = null;
        this.hash = "invalidhash";

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(this.doRequest.bind(this), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    doRequest() {

        let url = this.props.baseUrl + "sync?session_id=";
        url += this.props.session_id;
        url += "&admin_token=";
        url += this.props.admin_token;
        url += "&hash=";
        url += this.hash;
        url += "&type=users";

        fetch(url, {method: "GET"})
            .then(dataRaw => dataRaw.json())
            .then(dataJSON => {
                if (dataJSON.data.status === "already updated") return;
                this.hash = dataJSON.data.hash;
                const users = dataJSON.data.users.map(user => [user.liu_id, user.timestamp, user.vote]);
                this.updateList(users);
            });
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

    render() {

        // How we know a new session was opened, ergo we need to open an eventSource at this
        if (this.props.session_id != this.savedSession) {
            this.doRequest();
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
