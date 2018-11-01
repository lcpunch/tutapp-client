import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import '../student/ProgramStyle.css';

class AssociateTutors extends Component {

    componentWillMount() {
      this.props.fetchAllUsers();
    }

    constructor(props, context) {
      super(props, context);
      this.renderProgram = this.renderProgram.bind(this);
      this.handleClickAssociate = this.handleClickAssociate.bind(this);

    }

    handleClickAssociate(program) {
      this.props.associateTutor(program.id, this.props.match.params.id,(route) => {
        this.props.history.push(route);
      });
    }

    renderProgram(program) {
        return(
            <div className="list-group-item list-group-item-action card card-block mt-1" key={program.id}>
                <div className="media">
                    <div className="media-body">
                    <h4 className="title">
                        {program.name}
                    </h4>
                    <p className="summary">{program.email}</p>
                    </div>
                    <button className="btn btn-danger" 
                        onClick={() => this.handleClickAssociate(program)}>Associer
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Tuteurs:</h3>
                <p>Choisisser un tuteur pour le cours</p>
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
)(AssociateTutors);
