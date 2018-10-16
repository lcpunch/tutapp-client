import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './ProgramStyle.css';

class Courses extends Component { 

    componentWillMount() {
        this.props.fetchCourses(this.props.match.params.id);
    }

    renderCourse(course) {
        return(
            <Link to={"/courses/"+course.id} key={course.id}>
                <div className="list-group-item list-group-item-action card card-block" key={course.id}>
                    <h4 className="card-title">{course.title}</h4>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Courses</h3>
                <p>Liste de courses disponibles</p>
                <div className="list-group">
                    {this.props.programs.map(this.renderCourse)}
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
  
  