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

        this.savedVoteCode = null;
        this.intervalId = null;
        this.hash = "invalidhash";

        this.state = {
            showVoteConfig: false,
            showVoteCode: false
        };
    }

    handleConfigVote() {
        this.setState({
            showVoteConfig: true
        });
    }

    handleNewVote(vote_code, question, alternatives) {

        this.props.onNewVote(vote_code, question, alternatives);

        this.setState({
            showVoteConfig: false,
            question: question || this.state.question
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

    doRequest() {
        let url = this.props.baseUrl + "sync?session_id=";
        url += this.props.session_id;
        url += "&admin_token=";
        url += this.props.admin_token;
        url += "&hash=";
        url += this.hash;
        url += "&type=votes";


        fetch(url, {method: "GET"})
            .then(dataRaw => dataRaw.json())
            .then(dataJSON => {

                if (dataJSON.data.status === "already updated") return;
                const votes = dataJSON.data.votes;

                let alternatives = [];

                for (let key in votes) {
                    alternatives.push([key, votes[key]]);
                }

                this.updateVotes(alternatives);
            }
        );
    }

    updateVotes(alternatives) {
        this.setState({
            alternatives: alternatives
        });

        this.newData = true;
    }

    setQuestion(question) {
        this.setState({
            question: question
        });
    }

    componentDidMount() {
        this.intervalId = setInterval(this.doRequest.bind(this), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {

        let showVoteCodeButton = null;
        let voteVis = null;

        if (this.props.vote_code) {

            if (this.props.vote_code != this.savedVoteCode) {
                this.doRequest();
                this.savedVoteCode = this.props.vote_code;
            }

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
