import React from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import QR from './QR.jsx';

export default class PanelSession extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showToken: false
        };
    }

    handleShowToken() {
        this.setState({
            showToken: true
        })
    }

    handleHideToken() {
        this.setState({
            showToken: false
        })
    }

    render() {

        const newSessionButton =
            <Button
                bsSize="large"
                bsStyle="success"
                onClick={this.props.onNewSession}
                block
                className="raised panel-session-new-button"
            >
                <Glyphicon glyph="repeat"/> Byt Session
            </Button>;

        const adminToken = this.state.showToken ? <p>{this.props.admin_token}</p> :
            <p id="panel-session-admin_token" style={{
                backgroundColor: "#282828",
                borderRadius: "2px",
                color: "white",
                width: "90px",
                margin: "0 auto",
            }}>
                • • • • • • • • •
            </p>;

        return (
            <Panel header={newSessionButton} className="panel panel-session">
                <h3 style={{marginTop: "5px"}}>Session ID</h3>
                <p>{this.props.session_id}</p>
                <hr className="panel-session-hr"/>
                <div
                    onMouseEnter={this.handleShowToken.bind(this)}
                    onMouseLeave={this.handleHideToken.bind(this)}
                >
                    <h3>Admin Token</h3>
                    {adminToken}
                </div>
                <hr className="panel-session-hr"/>
                <h3>Vote Code</h3>
                <p>{this.props.vote_code || "-"}</p>
                <hr className="panel-session-hr"/>
                <QR baseUrl={this.props.baseUrl}
                    session_id={this.props.session_id}
                    admin_token={this.props.admin_token}
                />
            </Panel>
        );
    }

}
