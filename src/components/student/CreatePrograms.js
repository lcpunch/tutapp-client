import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import '../Styles.css';

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
              <div className="media">
                <Link to={"/editProgram/" + program.id} className="pull-left mr-2">
                  <img src="programmes.png" alt="edit" style={{maxWidth: '50px', maxHeight: '50px'}} />
                </Link>
                <div className="media-body">
                  <h4 className="title">
                    {program.title}
                  </h4>
                  <p className="summary">{program.description}</p>
                </div>
                <span onClick={() => this.handleClickOpenDelete(program)}>&#10008;</span>
              </div>
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
