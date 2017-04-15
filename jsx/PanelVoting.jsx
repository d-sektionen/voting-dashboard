import React from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import VoteCreater from './VoteCreater.jsx';
import VoteVisualizer from './VoteVisualizer.jsx';


export default class PanelVoting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showVoteConfig: false,
            showVoteCode: false
        };

        this.props.socket.on('vote_update', data => {
            const newVoteCode = data.vote_code;
            const newQuestion = data.question;
            if (newVoteCode !== this.props.vote_code || newQuestion !== this.state.question) {
                this.handleNewVote(newVoteCode, newQuestion);
            }

            const votes = data.votes;
            let alternatives = [];

            for (let key in votes) {
                alternatives.push([key, votes[key]]);
            }

            if (alternatives.length > 0) {
                this.updateVotes(alternatives);
            }
        });
    }

    handleConfigVote() {
        this.setState({
            showVoteConfig: true
        });
    }

    handleNewVote(vote_code, question) {
        this.props.onNewVote(vote_code);

        this.setState({
            showVoteConfig: false,
            question: question
        });
    }

    handleVoteCreaterAbort() {
        this.setState({
            showVoteConfig: false
        });
    }

    handleShowVoteCode() {
        this.setState({
            showVoteCode: true
        });
    }

    handleHideVoteCode() {
        this.setState({
            showVoteCode: false
        });
    }

    updateVotes(alternatives) {
        this.setState({
            alternatives: alternatives
        });

        this.newData = true;
    }

    render() {

        let showVoteCodeButton = null;
        let voteVis = null;

        if (this.props.vote_code) {

            showVoteCodeButton = <Button
                onClick={this.handleShowVoteCode.bind(this)}
                bsStyle="info"
                style={{float: "right"}}
                className="raised"
            >
                <Glyphicon glyph="eye-open"/> Vote Code
            </Button>;

            voteVis =
                <VoteVisualizer alternatives={this.state.alternatives}
                                disableAllAnimations={!this.newData}
                />;

            this.newData = false;
        }

        return (
            <div>
                <VoteCreater
                    baseUrl={this.props.baseUrl}
                    adminHeaders={this.props.adminHeaders}
                    onNewVote={this.handleNewVote.bind(this)}
                    show={this.state.showVoteConfig}
                    onAbort={this.handleVoteCreaterAbort.bind(this)}
                    session_id={this.props.session_id}
                    admin_token={this.props.admin_token}
                />

                <Modal
                    show={this.state.showVoteCode}
                    onHide={this.handleHideVoteCode.bind(this)}
                    dialogClassName="vote_code-modal"
                >
                    <Modal.Body>
                        <text className="vote_code-text">
                            {this.props.vote_code}
                        </text>
                    </Modal.Body>
                </Modal>

                <Panel className="panel panel-voting">
                    <h2 className="panel-header">Omröstning</h2>
                    <hr />

                    <div className="panel-voting-body">
                        <Button
                            bsStyle="success"
                            onClick={this.handleConfigVote.bind(this)}
                            className="raised"
                        >
                            <Glyphicon glyph="plus"/> Starta ny omröstning
                        </Button>
                        {showVoteCodeButton}

                        <h3 style={{textAlign: "center"}}>{this.state.question}</h3>
                        {voteVis}
                    </div>

                </Panel>
            </div>
        );
    }
}
