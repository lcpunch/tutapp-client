import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import './ProgramStyle.css';

class Programs extends Component { 

    componentDidMount() {
         this.props.fetchPrograms();
    }

    renderProgram(program) {
        return(
            <div className="list-group-item list-group-item-action card card-block" key={program.id}>
                <h4 className="card-title">{program.title}</h4>
                <p className="card-text">{program.description}</p>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron border border-secondary">
                    <h3>Programs</h3>
                    <p>List of programs</p>
                </div>
                <div className="list-group">
                    {this.props.programs.map(this.renderProgram)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { programs: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Programs);
  
  