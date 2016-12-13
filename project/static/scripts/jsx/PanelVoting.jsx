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

        this.disableAnimations = false;

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

    componentDidMount() {
        this.update();

        this.setState({
            intervalId: setInterval(this.update.bind(this), 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    newData(alternatives) {

        if (alternatives && !this.state.alternatives) return true;

        if (alternatives.length !== this.state.alternatives.length) {
            return true;
        }

        for (let i in alternatives) {
            for (let j in alternatives[i]) {
                if (alternatives[i][j] !== this.state.alternatives[i][j]) {
                    return true;
                }
            }
        }

        return false;

    }

    update() {

        if (!this.props.configured) return;

        fetch(this.props.baseUrl + "vote",
            {method: "GET", headers: this.props.adminHeaders})
            .then(response => response.json())
            .then(responseJSON => {
                if (!responseJSON) return;

                let newVoteStarted = false;

                if (responseJSON.data.vote_code !== this.props.vote_code) {
                    // Vote was recreated somewhere else
                    // Pass data to parent as if we created the vote
                    newVoteStarted = true;
                    this.props.onNewVote(responseJSON.vote_code, responseJSON.data.question, responseJSON.data.alternatives)
                }

                let alternatives = [];

                for (let key in responseJSON.data.votes) {
                    alternatives.push([key, responseJSON.data.votes[key]]);
                }

                // Makes sure we only update if there's new vote-data to display.
                this.disableAnimations = !(!this.newData(alternatives) || newVoteStarted);

                this.setState({
                    question: responseJSON.data.question,
                    alternatives: alternatives
                });

            });
    }

    render() {

        let showVoteCodeButton = null;
        let voteVis = null;

        if (this.props.configured) {
            showVoteCodeButton = <Button
                onClick={this.handleShowVoteCode.bind(this)}
                bsStyle="info"
                style={{float: "right"}}
                className="raised"
            >
                <Glyphicon glyph="eye-open"/> Vote Code
            </Button>;

            voteVis = <VoteVisualizer alternatives={this.state.alternatives} disableAnimations={this.disableAnimations}/>;
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
