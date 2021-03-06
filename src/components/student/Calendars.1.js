import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import * as actions from '../../actions';

import './ProgramStyle.css';

class Calendars extends Component { 

    componentWillMount() {
        this.props.fetchCalendars(this.props.match.params.id);
    }

    renderCalendar(calendar) {
        return(
            <Link to={"/calendar/" + calendar.user_id + "/" + calendar.dtavailability} key={calendar.id}>
                <div className="list-group-item list-group-item-action card card-block mt-1" key={calendar.id}>
                    <Moment format="DD/MM/YYYY">
                        {calendar.dtavailability}
                    </Moment>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Dates disponibles</h3>
                <div className="list-group mt-3">
                    {this.props.calendars.map(this.renderCalendar)}
                </div>
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
  
  