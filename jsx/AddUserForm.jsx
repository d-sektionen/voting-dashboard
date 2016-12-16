import React from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class AddUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.liuIdPattern = new RegExp("^[A-Za-z]{5}[0-9]{3}$");

        this.state = {
            liu_id: "",
            valid: true,
            already_registered: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.liuIdPattern.test(this.state.liu_id)) {                    // If the input was a valid liu_id
            const status = this.props.onSubmit(this.state.liu_id);

            status.then(status => {
                if (status == "registered") {
                    this.setState({
                        liu_id: ""
                    });
                } else if (status == "already registered") {                // TODO use this in some sort of tooltip
                    this.setState({
                        already_registered: true,
                        valid: false
                    });
                } else {
                    this.setState({
                        valid: false
                    });
                }
            });
        } else {
            this.setState({
                valid: false
            });
        }
    }

    handleLiuIdUpdate(e) {
        this.setState({
            liu_id: e.target.value,
            valid: true,
            already_registered: false
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup
                    controlId="liu_id"
                    className="add-user-form"
                    validationState={this.state.valid ? null : "error"}
                >
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="LiU ID"
                            value={this.state.liu_id}
                            onChange={this.handleLiuIdUpdate.bind(this)}
                            style={{height: "37px", marginTop: "3px"}}
                        />
                        <InputGroup.Button>
                            <Button
                                type="submit"
                                id="liuid-submit-button"
                                bsStyle="success"
                                className="raised"
                            ><Glyphicon glyph="plus"/>
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }
}
