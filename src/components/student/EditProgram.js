import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './ProgramStyle.css';

class EditProgram extends Component {

    componentWillMount() {
        this.props.fetchProgram(this.props.match.params.id);
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Edit Program:</h3>
                <div className="list-group">
                  <label>
                    Name:
                    <input type="text" name="name" value={this.props.program.title}/>
                  </label>
                  <label>
                    description:
                    <textarea type="text" name="description" value={this.props.program.description} />
                  </label>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return { program: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(EditProgram);
