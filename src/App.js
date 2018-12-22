import React, { Component } from 'react';
import logo from './dumbell.svg';
import './App.css';
import CustomerTable from './components/CustomerTable.js';
import TrainingsTable from './components/TrainingsTable.js';
import ModalFormAddCustomer from './components/ModalFormAddCustomer.js';
import ModalFormAddTraining from './components/ModalFormAddTraining.js';
import Calendar from './components/Calendar.js';
import { Tab, Row, Col, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerModal: false,
      trainingModal: false
    }
  }

  // this seems to be the only way to add placeholder to react-table filter input field
  addFilterPlaceholder = () => {
    const filters = document.querySelectorAll("div.rt-th > input");
    for (let filter of filters) {
      filter.placeholder = "Search..";
      filter.style.paddingLeft = "10px";
    }
  }

  componentDidMount() {
    this.addFilterPlaceholder();
  }

  render() {
    let closeCustomerModal = () => this.setState({ customerModal: false });
    let closeTrainingModal = () => this.setState({ trainingModal: false });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Tab.Container id="tabs-with-dropdown" defaultActiveKey="customers">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="customers">Customers</NavItem>
                <NavItem eventKey="trainings">Trainings</NavItem>
                <NavItem eventKey="calendar">Calendar</NavItem>
                <NavDropdown title="Add.." >
                  {/* HOW TO DISABLE TAB CHANGE ON CLICK? */}
                  <MenuItem eventKey="addCustomers" onClick={() => this.setState({ customerModal: true })}>New customer</MenuItem>
                  <MenuItem eventKey="addTrainings" onClick={() => this.setState({ trainingModal: true })}>New training</MenuItem>
                </NavDropdown>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="customers"><CustomerTable /></Tab.Pane>
                <Tab.Pane eventKey="trainings"><TrainingsTable /></Tab.Pane>
                <Tab.Pane eventKey="addCustomers"><CustomerTable /></Tab.Pane>
                <Tab.Pane eventKey="addTrainings"><TrainingsTable /></Tab.Pane>
                <Tab.Pane eventKey="calendar"><Calendar /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <ModalFormAddCustomer show={this.state.customerModal} onHide={closeCustomerModal} />
        <ModalFormAddTraining show={this.state.trainingModal} onHide={closeTrainingModal} />
      </div>
    );
  }
}

export default App;