import React from 'react';
import FlipMove from 'react-flip-move';

import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


class VoteOption extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            valid: true
        };
    }

    handleChange(e) {
        this.setState({
            text: e.target.value,
            valid: !!e.target.value
        });

        this.props.onChange(e, this.props.uniqueId);
    }

    handleRemove() {
        this.props.onRemove(this.props.uniqueId);
    }

    render() {

        let content;

        if (this.props.removeable) {
            content = <InputGroup>
                <FormControl
                    type="text"
                    value={this.state.text}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange.bind(this)}
                />
                <InputGroup.Button>
                    <Button
                        type="button"
                        id="voteform-remove-button"
                        bsStyle="danger"
                        onClick={this.handleRemove.bind(this)}
                    ><Glyphicon glyph="minus"/>
                    </Button>
                </InputGroup.Button>
            </InputGroup>;
        } else {
            content = <FormControl
                type="text"
                value={this.state.text}
                placeholder={this.props.placeholder}
                onChange={this.handleChange.bind(this)}
            />;
        }
        return (
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.state.valid ? null : "error"}
            >
                {content}
            </FormGroup>
        );
    }
}


class CreateVoteForm extends React.Component {

    constructor(props) {
        super(props);

        let newOptions = [];

        for (let i in [1, 2]) {
            newOptions.push({text: "", id: Date.now() - i * 100});       // Special case as their keys need to be unique.
        }

        this.state = {
            options: newOptions
        };
    }

    handleChange(e, id) {
        let newOptions = this.state.options;
        let toSet;

        for (let i in newOptions) {
            if (newOptions[i].id == id) {
                toSet = i;
            }
        }

        newOptions[toSet].text = e.target.value;

        this.setState({
            options: newOptions
        });
    }

    handleNewOption() {
        let newOptions = this.state.options.slice();
        newOptions.push({text: "", id: Date.now()});

        this.setState({
            options: newOptions
        });
    }

    handleRemoveOption(id) {
        let newOptions = this.state.options;
        let toRemove;

        for (let i in newOptions) {                 // Ugly method in order to find which alternative we are looking for
            if (newOptions[i].id === id) {
                toRemove = i;
            }
        }

        newOptions.splice(toRemove, 1);

        this.setState({
            options: newOptions
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const optionTexts = this.state.options.map(option => option.text);      // Returns an easy-to-read

        for (let i in optionTexts) {
            if (!optionTexts[i]) {
                return;                                 // If any option unfilled, return.
            }
        }

        const newQuestion = optionTexts.splice(0, 1)[0];
        const data = {question: newQuestion, alternatives: optionTexts};

        fetch(this.props.baseUrl + "vote",
            {method: "POST", headers: this.props.adminHeaders, body: JSON.stringify(data)})
            .then(response => response.json())
            .then(responseJSON => {
                this.props.onSubmit(responseJSON.data.vote_code, responseJSON.data.question, responseJSON.data.alternatives);
            });
    }

    render() {

        const options = this.state.options.map((option, index) => {
            return (
                <VoteOption
                    controlId={index ? ("alt" + index) : "question"}
                    placeholder={index ? ("Alternativ " + index) : "Fråga"}
                    removeable={index > 1}
                    onRemove={this.handleRemoveOption.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    uniqueId={option.id}
                    key={option.id}
                />
            );
        });

        return (
            <form>
                <FlipMove
                    duration={150}
                    enterAnimation="accordionHorizontal"
                    leaveAnimation="accordionHorizontal"
                    easing="ease-in"
                >
                    {options}
                    <ButtonToolbar>
                        <Button
                            onClick={this.handleNewOption.bind(this)}
                            bsStyle="success"
                            type="button"
                            className="raised"
                        >
                            <Glyphicon glyph="plus"/> Nytt alternativ
                        </Button>
                        <Button
                            style={{float: "right"}}
                            onClick={this.handleSubmit.bind(this)}
                            bsStyle="success"
                            type="submit"
                            className="raised"
                        >
                            <Glyphicon glyph="ok"/> Sätt omröstning
                        </Button>
                    </ButtonToolbar>

                </FlipMove>
            </form>
        );
    }
}


export default class VoteCreater extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(vote_code, question, alternatives) {
        this.props.onNewVote(vote_code, question);
    }

    handleClosing() {
        this.props.onAbort();
    }

    render() {

        let savedVotesUrl = this.props.baseUrl + "votesaver";
        savedVotesUrl += "?session_id=" + this.props.session_id;
        savedVotesUrl += "&admin_token=" + this.props.admin_token;

        return (
            <Modal
                show={this.props.show}
                onHide={this.handleClosing.bind(this)}
                className="vote-creater-modal"
            >
                <Modal.Header
                    style={{textAlign: "center"}}
                    closeButton
                >
                    <Modal.Title>Skapa en ny omröstning</Modal.Title>
                    <p>Varning: Genom att skapa en ny omröstning kommer den befintliga omröstningen tas bort.</p>
                    <text>Klicka <a href={savedVotesUrl}>här</a> om du vill hämta en kopia av den aktuella.</text>
                </Modal.Header>
                <Modal.Body>
                    <CreateVoteForm
                        onSubmit={this.handleSubmit.bind(this)}
                        baseUrl={this.props.baseUrl}
                        adminHeaders={this.props.adminHeaders}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

