import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import './ProgramStyle.css';

class Courses extends Component { 

    componentWillMount() {
        this.props.fetchCourses(this.props.match.params.id);
    }

    renderProgram(program) {
        return(
            <Link to="/courses" key={program.id}>
                <div className="list-group-item list-group-item-action card card-block" key={program.id}>
                    <h4 className="card-title">{program.title}</h4>
                    <p className="card-text">{program.description}</p>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron border border-secondary">
                    <h3>Courses</h3>
                    <p>List of courses</p>
                </div>
                <div className="list-group">
                    {this.props.programs.map(this.renderProgram)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    return { programs: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Courses);
  
  