import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import deleteImg from './img/delete.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
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
                this.setState({ customers: responseJSON.content })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                :
                true
        );
    }

    deleteCustomer = (customer) => {
        let toBeDeleted = this.state.customers.filter((value) => {
            return value.links[0].href === customer
        })
        confirmAlert({
            title: 'Confirm to delete',
            message: `Delete ${toBeDeleted[0].firstname} ${toBeDeleted[0].lastname}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(customer, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(() => this.getCustomers())
                        .catch((error) => alert(error));
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    componentWillMount() {
        this.getCustomers();
    }


    render() {
        return (
            <div id="customers">
                <ReactTable data={this.state.customers}
                    defaultPageSize={15}
                    filterable
                    defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row)}
                    columns={[
                        {
                            Header: 'First name',
                            accessor: 'firstname'
                        },
                        {
                            Header: 'Last name',
                            accessor: 'lastname'
                        },
                        {
                            Header: 'Email',
                            accessor: 'email'
                        },
                        {
                            Header: 'Phone number',
                            accessor: 'phone'
                        },
                        {
                            Header: 'Street address',
                            accessor: 'streetaddress'
                        },
                        {
                            Header: 'Postcode',
                            accessor: 'postcode'
                        },
                        {
                            Header: 'City',
                            accessor: 'city'
                        },
                        {
                            filterable: false,
                            accessor: 'links[0].href',
                            sortable: false,
                            Cell: ({ value }) => (
                                <img src={deleteImg} alt='delete' 
                                style={{ opacity: 0.4, cursor: 'pointer' }} 
                                width='12' height='12' onClick={() => this.deleteCustomer(value)}>
                                </img>
                            ) ,
                            width: 50
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

export default CustomerTable;