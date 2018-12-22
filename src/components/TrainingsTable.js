import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import deleteImg from './img/delete.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class TrainingsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: []
        }
    }

    getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings/')
            .then((response) => {
                if (!response.ok) {
                    console.log('Oops! Something went wrong!')
                }
                else
                    return response.json()
            })
            .then((responseJSON) => {

                let trainings = responseJSON.filter((training) => {
                    // someone added a training without a customer to the database. null values broke the code so here's a quick fix.
                    if (!training.customer) {
                        return false;
                    }
                    return true;
                })

                trainings.map((training, index) => {
                    // format the date to correct form
                    return training.date = moment((training.date)).format('MM/DD/YYYY hh:mm');
                });

                this.setState({ trainings })
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
    
    deleteTraining = (id) => {
        let toBeDeleted = this.state.trainings.filter((value) => {
            return id === value.id
        })
        confirmAlert({
            title: 'Confirm to delete',
            message: `Delete ${toBeDeleted[0].activity} from ${toBeDeleted[0].customer.firstname}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(() => this.getTrainings())
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
        this.getTrainings();
    }

    render() {

        return (
            <div id="trainings">
                <ReactTable data={this.state.trainings}
                    defaultPageSize={15}
                    filterable
                    defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row)}
                    columns={[
                        {
                            Header: 'Date (MM/DD/YYYY)',
                            accessor: 'date'
                        },
                        {
                            id: 'customer.id',
                            Header: 'Customer',
                            accessor: data => `${data.customer.firstname} ${data.customer.lastname}`
                        },
                        {
                            Header: 'Activity',
                            accessor: 'activity'
                        },
                        {
                            Header: 'Duration (minutes)',
                            accessor: 'duration',
                            filterable: false
                        },
                        {
                            filterable: false,
                            sortable: false,
                            accessor: 'id',
                            Cell: ({ value }) => (
                                <img src={deleteImg} alt='delete' 
                                style={{ opacity: 0.4, cursor: 'pointer' }} 
                                width='12' height='12' onClick={() => this.deleteTraining(value)}>
                                </img>
                            ),
                            width: 50
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        )
    }

}

export default TrainingsTable;