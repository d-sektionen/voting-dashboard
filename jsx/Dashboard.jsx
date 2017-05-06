import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';

import PanelSession from './PanelSession.jsx';
import PanelVoting from './PanelVoting.jsx';
import PanelRegistrations from './PanelRegistrations.jsx';
import SessionOpener from './SessionOpener.jsx';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const mountNode = document.getElementById('dashboard');
const baseUrl = "https://d-sektionen.se/api/voting/";
// const baseUrl = "http://localhost/api/voting/";
const allowedSections = ['d', 'y', 'm', 'i'];

class Dashboard extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showVoteConfig: false,
            session_id: cookie.load("session_id"),
            admin_token: cookie.load("admin_token"),
            vote_code: cookie.load("vote_code"),
            configured: !!cookie.load("session_id"),
            section: cookie.load("section")
        };
    }

    handleSessionOpened(data) {
        this.setState({
            session_id: data.session_id,
            admin_token: data.admin_token,
            section: data.section,
            configured: true,
            vote_code: null
        });

        cookie.remove("vote_code", {path: '/'});
        cookie.save('session_id', data.session_id, {path: '/', maxAge: 60 * 60 * 10});
        cookie.save('admin_token', data.admin_token, {path: '/', maxAge: 60 * 60 * 10});
        cookie.save('section', data.section, {path: '/', maxAge: 60 * 60 * 10});
    }

    getAdminHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": JSON.stringify({
                "session_id": this.state.session_id,
                "admin_token": this.state.admin_token
            })
        };
    }

    handleNewVote(vote_code) {
        if (vote_code) {            // We can also call this when the vote-creation was canceled (i.e. no vote_code)
            this.setState({
                vote_code: vote_code
            });
            cookie.save('vote_code', vote_code, {path: '/', maxAge: 60 * 60 * 10});
        }
    }

    handleNewSessionButtonClick() {
        this.setState({configured: false});
    }

    handleNewSessionButtonCanceled() {
        this.setState({configured: true});
    }

    render() {

        const newSession = !this.state.configured;
        return (
            <div>
                <SessionOpener
                    onSessionOpened={this.handleSessionOpened.bind(this)}
                    show={newSession}
                    closeable={!!cookie.load("session_id")}                          // Only allow closing if session exists.
                    onClose={this.handleNewSessionButtonCanceled.bind(this)}
                    baseUrl={baseUrl}
                    allowedSections={allowedSections}
                />

                <div className="page-header">
                    <h1 style={{marginTop: "15px"}}>Dashboard för D-Cide</h1>
                    <small className="subtitle">Skapat av D-sektionens WebbU 16-17</small>
                </div>

                <div
                    style={{
                        width: "70px",
                        height: "70px",
                        position: "absolute",
                        left: "10px",
                        top: "10px",
                        backgroundImage: "url(img/logos/" + this.state.section + "-sek_logo.png)",
                        backgroundSize: "70px 70px"
                    }}
                />

                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col xs={12} md={3}>
                            <PanelSession
                                onNewSession={this.handleNewSessionButtonClick.bind(this)}
                                session_id={this.state.session_id}
                                admin_token={this.state.admin_token}
                                vote_code={this.state.vote_code}
                                baseUrl={baseUrl}
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <PanelVoting
                                onNewVote={this.handleNewVote.bind(this)}
                                vote_code={this.state.vote_code}
                                question={this.state.question}
                                adminHeaders={this.getAdminHeaders()}
                                baseUrl={baseUrl}
                                session_id={this.state.session_id}
                                admin_token={this.state.admin_token}
                            />
                        </Col>
                        <Col xs={12} md={3}>
                            <PanelRegistrations
                                adminHeaders={this.getAdminHeaders()}
                                baseUrl={baseUrl}
                                session_id={this.state.session_id}
                                admin_token={this.state.admin_token}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

ReactDOM.render(<Dashboard/>, mountNode);
