import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import TimePicker from 'react-times';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import Selectable from '../tutor/Selectable';
import * as actions from '../../actions';

const localizer = BigCalendar.momentLocalizer(moment) 

class Calendars extends Component { 

    componentWillMount() {
        this.props.fetchCalendars(this.props.match.params.id);
    }

    constructor(props, context){
        super(props, context);
        this.renderTimePicker = this.renderTimePicker.bind(this);
    }

    renderTimePicker() {
        return <TimePicker
            theme="classic"
            timeMode="24"
            timeConfig={{
                from: '08:00',
                to: '23:00',
                step: 1,
                unit: 'hour'
            }}
            onTimeChange={this.onTimeChange.bind(this)}
        />;
    }

    render() {
        return (
            <div className="container-fluid h-100">
                <h3 className="mt-3">Dates disponibles</h3>
                <div className="mt-3"></div>
                <Selectable
                    localizer={localizer}
                    id={this.props.match.params.id}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { calendars: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Calendars);
  
  