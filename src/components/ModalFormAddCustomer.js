import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class ModalFormAddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            streetAddress: '',
            postcode: '',
            city: '',
            email: '',
            phoneNumber: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async () => {
        let newCustomer = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            streetaddress: this.state.streetAddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phoneNumber
        }
        console.log(newCustomer);

        await fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(this.props.onHide())
            .then(() => window.location.reload())
            .catch((error) => console.log(error));
    }

    resetForm = () => {
        this.setState({
            firstName: '',
            lastName: '',
            streetAddress: '',
            postcode: '',
            city: '',
            email: '',
            phoneNumber: ''
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-mg"
                onExit={this.resetForm}
                backdrop={'static'}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-lg">Customer details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup controlId="formInlineFirstName">
                            <ControlLabel>First name</ControlLabel>{' '}
                            <FormControl type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineLastName">
                            <ControlLabel>Last name</ControlLabel>{' '}
                            <FormControl type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineStreetAddress">
                            <ControlLabel>Street address</ControlLabel>{' '}
                            <FormControl type="text" name="streetAddress" value={this.state.streetAddress} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlinePostcode">
                            <ControlLabel>Postcode</ControlLabel>{' '}
                            <FormControl type="text" name="postcode" value={this.state.postcode} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineCity">
                            <ControlLabel>City</ControlLabel>{' '}
                            <FormControl type="text" name="city" value={this.state.city} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Email</ControlLabel>{' '}
                            <FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlinePhone">
                            <ControlLabel>Phone number</ControlLabel>{' '}
                            <FormControl type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <div id="formButtons">
                            <Button bsStyle="danger" onClick={this.props.onHide}>Cancel</Button>
                            <Button bsStyle="success" onClick={this.handleSubmit}>Save</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalFormAddCustomer;