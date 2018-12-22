import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class ModalFormAddTraining extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            customers: [],
            customer: '',
            date: '',
            activity: '',
            duration: ''
        }
    }

    componentWillMount() {
        this.getCustomers();
    }

    getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers/')
            .then((response) => {
                if (!response.ok) {
                    console.log('Oops! Something went wrong!')
                }
                else
                    return response.json()
            })
            .then((responseJSON) => {
                this.setState({ customers: responseJSON.content, customer: responseJSON.content[0].links[0].href })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async () => {
        let newTraining = {
            date: this.state.date,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.state.customer
        }

        await fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
            .then(this.props.onHide())
            .then(() => window.location.reload())
            .catch((error) => console.log(error));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    resetForm = () => {
        this.setState({
            date: '',
            activity: '',
            duration: ''
        })
    }

    render() {
        const customers = this.state.customers.map((customer, index) =>
        <option key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</option>
        )
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-lg"
                onExit={this.resetForm}
                backdrop={'static'}
                id="asd"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-lg">Customer details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Customer</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" onChange={(e) => this.setState({customer: e.target.value})}>
                            {customers}
                        </FormControl>
                        <FormGroup controlId="formInlineFirstName">
                            <ControlLabel>Date</ControlLabel>{' '}
                            <FormControl type="text" name="date" placeholder="YYYY-DD-MM" value={this.state.date} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineLastName">
                            <ControlLabel>Activity</ControlLabel>{' '}
                            <FormControl type="text" name="activity" value={this.state.activity} onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlineStreetAddress">
                            <ControlLabel>Duration (min)</ControlLabel>{' '}
                            <FormControl type="number" name="duration" value={this.state.duration} onChange={this.handleChange} />
                        </FormGroup>{' '}
                    </FormGroup>
                    <div id="formButtons">
                        <Button bsStyle="danger" onClick={this.props.onHide}>Cancel</Button>
                        <Button bsStyle="success" onClick={this.handleSubmit}>Save</Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalFormAddTraining;