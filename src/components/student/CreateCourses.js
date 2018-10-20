import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './ProgramStyle.css';

class CreateCourses extends Component {

    componentWillMount() {
      this.props.fetchAllCourses();
    }

    constructor(props, context) {
      super(props, context);
      this.renderProgram = this.renderProgram.bind(this);
      this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);

    }

    handleClickOpenDelete(program) {
      this.props.deleteCourse(program);
    }

    renderProgram(program) {
        return(
          <div className="list-group-item list-group-item-action card card-block mt-1" key={program.id}>
              <Link to={"/editCourse/" + program.id} key={program.id}>
                <h4 className="card-title">{program.title}</h4>
              </Link>
              <button className="btn btn-danger" onClick={() => this.handleClickOpenDelete(program)}>Effacer</button>
          </div>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Courses</h3>
                <p>Liste de courses disponibles</p>
                <Link className="btn btn-primary" to="/createCourse">Créer un courses</Link>
                <br /><br />
                <div className="list-group">
                    {this.props.programs.map(this.renderProgram)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return { programs: state.course.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(CreateCourses);
