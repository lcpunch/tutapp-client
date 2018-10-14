import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import './ProgramStyle.css';

class Hours extends Component { 

    componentWillMount() {
        this.props.fetchHours(this.props.match.params.id, this.props.match.params.date);
    }

    renderHours(calendar) {
        return(
            <Link to={"/calendar/" + calendar.id} key={calendar.id}>
                <div className="list-group-item list-group-item-action card card-block mt-1" key={calendar.id}>
                    {calendar.hrstart +" - "+calendar.hrfinish}
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Dates disponibles</h3>
                <div className="list-group mt-3">
                    {this.props.calendars.map(this.renderHours)}
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
)(Hours);
  
  