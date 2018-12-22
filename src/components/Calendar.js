import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            events: []
        }
    }

    getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings/')
            .then((response) => response.json())
            .then((responseJSON) => {

                let trainings = responseJSON.filter((training) => {
                    // someone added a training without a customer to the database. null values broke the code so here's a quick fix.
                    if (!training.customer) {
                        return false;
                    }
                    return true;
                })
                this.setState({ trainings })
            })
            .then(() => this.makeEvents())
            .catch((error) => {
                console.log(error);
            });
    }

    makeEvents = () => {
        let scheduledTrainings = [];
        this.state.trainings.map((training, index) => {
            let endTime = moment(training.date).add(training.duration, 'm').toDate();
            return scheduledTrainings[index] = {
                id: index,
                title: training.activity ? `${training.customer.firstname} ${training.customer.lastname}, ${training.activity}` : `${training.customer.firstname} ${training.customer.lastname}, ???`,
                start: moment(training.date).toDate(),
                end: endTime,
                allDay: false
            };
        });
        this.setState({ events: [...scheduledTrainings] });
    }



    componentWillMount() {
        this.getTrainings();
    }

    render() {
        return (
            <div id="calendar">
                <BigCalendar
                    showMultiDayTimes
                    localizer={localizer}
                    events={this.state.events}
                    defaultDate={new Date()}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        )
    }

}

export default Calendar;