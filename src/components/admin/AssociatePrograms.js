import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class Programs extends Component {

    componentDidMount() {
        this.props.fetchAllPrograms();
    }

    renderProgram(program) {
        return(
            <Link to={"/programs/" + program.id} key={program.id}>
                <div className="list-group-item list-group-item-action card card-block mt-1" key={program.id}>
                    <h4 className="card-title">{program.title}</h4>
                    <p className="card-text">{program.description}</p>
                </div>
            </Link>
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
