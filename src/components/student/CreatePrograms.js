import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './ProgramStyle.css';

class CreatePrograms extends Component {

    componentDidMount() {
         this.props.fetchAllPrograms();
    }

    constructor(props, context) {
      super(props, context);
      this.renderProgram = this.renderProgram.bind(this);
      this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);

    }

    handleClickOpenDelete(program) {
      this.props.deleteProgram(program);
    }

    renderProgram(program) {
        return(
          <div className="list-group-item list-group-item-action card card-block mt-1" key={program.id}>
              <Link to={"/editProgram/" + program.id} key={program.id}>
                <h4 className="card-title">{program.title}</h4>
                <p className="card-text">{program.description}</p>
              </Link>
              <button className="btn btn-danger" onClick={() => this.handleClickOpenDelete(program)}>Effacer</button>
          </div>
        );
    }

    render() {

      if(!Array.isArray(this.props.programs) || this.props.programs.length < 1) {
        return <div>Loading...</div>;
      }

      return (
          <div className="container">
              <h3 className="mt-3">Programmes</h3>
              <p>Liste de Programmes disponibles</p>
              <Link className="btn btn-primary" to="/createProgram">Créer un programme</Link>
              <br /><br />
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
)(CreatePrograms);
