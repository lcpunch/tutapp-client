import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import './ProgramStyle.css';

class Tutors extends Component { 

    componentWillMount() {
        this.props.fetchTutors(this.props.match.params.id);
    }

    renderTutor(tutor) {
        return(
            <Link to={"/tutor" + tutor.id} key={tutor.id}>
                <div className="list-group-item list-group-item-action card card-block mt-1" key={tutor.id}>
                    <h4 className="card-title">{tutor.name}</h4>
                    <p className="card-text">{tutor.email}</p>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Tutors</h3>
                <p>List of tutors</p>
                <div className="list-group mt-3">
                    {this.props.tutors.map(this.renderTutor)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { tutors: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Tutors);
  
  