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

        this.state = {
            users: [],
            usersRaw: []
        };
    }

    componentDidMount() {

        this.setState({
            intervalId: setInterval(this.update.bind(this), 1000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    // Needed some way to detect if there had been a change in which users were to be displayed.
    newUsers(usersRaw) {
        if (this.state.usersRaw.length == 0) return true;

        if (this.state.usersRaw.length !== usersRaw.length) return true;

        for (let i in usersRaw) {
            for (let j in usersRaw[i]) {
                if (usersRaw[i][j] != this.state.usersRaw[i][j]) {
                    return true;
                }
            }
        }

        return false;
    }

    update() {

        const usersPromise = this.props.onUpdate();
        usersPromise.then(responseJson => responseJson.data.users)
            .then(users => {

                let usersRaw = users.map(user => [user.liu_id, user.timestamp, user.vote]);

                if (!this.newUsers(usersRaw)) return;

                let usersModified = usersRaw.slice();
                usersModified.sort();

                let userList = usersModified.map(user => {

                    return (
                        <User
                            key={user[0]}
                            user={user}
                            onRemove={() => this.props.onRemove(user[0])}
                        />
                    );
                });

                this.setState({
                    users: userList,
                    usersRaw: usersRaw
                });

            });
    }

    render() {
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
