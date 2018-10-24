import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

import './ProgramStyle.css';

class CreateUsers extends Component {

    componentWillMount() {
      this.props.fetchAllUsers();
    }

    constructor(props, context) {
      super(props, context);
      this.renderProgram = this.renderProgram.bind(this);
      this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);

    }

    handleClickOpenDelete(program) {
      this.props.deleteUser(program);
    }

    renderProgram(program) {
        return(
            <div className="list-group-item list-group-item-action card card-block mt-1" key={program.id}>
                <div className="media">
                    <Link to={"/editUser/" + program.id} className="pull-left mr-2">
                        <img src="programmes.png" alt="edit" style={{maxWidth: '50px', maxHeight: '50px'}} />
                    </Link>
                    <div className="media-body">
                    <h4 className="title">
                        {program.name}
                    </h4>
                    <p className="summary">{program.email}</p>
                    </div>
                    <span onClick={() => this.handleClickOpenDelete(program)}>&#10008;</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Utilisateurs:</h3>
                <p>Liste de utilisateurs disponibles</p>
                <Link className="btn btn-primary" to="/createUser">Créer un utilizateur</Link>
                <br /><br />
                <div className="list-group">
                    {this.props.programs.map(this.renderProgram)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return { programs: state.user.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(CreateUsers);
