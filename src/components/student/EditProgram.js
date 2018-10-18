import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import * as actions from '../../actions';

import './ProgramStyle.css';

class EditProgram extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          description: ''
        }
    }

    componentWillMount() {
        this.props.fetchProgram(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(nextProps.program, this.state.program)) {
        this.setState({...this.state,
          title: nextProps.program.title,
          description: nextProps.program.description
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const title = this.getTitle.value;
      const description =  this.getDescription.value;
      const data = {
        id: this.props.match.params.id,
        title,
        description
      }
      console.log(data)

      this.props.editProgram(data)
    }

    handleChange = (e) => {
      this.setState({
        title: e.target.value
      })
    }

    handleDescriptionChange = (e) => {
      this.setState({
        description: e.target.value
      })
    }

    render() {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
                 <h3>Edit Program:</h3>
                 <div className="form-group">
                    <label>Title</label>
                    <input required type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      ref={(input)=>this.getTitle = input}
                      value={this.state.title} placeholder="Title"/>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea required rows="5"
                      className="form-control"
                      onChange={this.handleDescriptionChange}
                      ref={(input)=>this.getDescription = input}
                      value={this.state.description} cols="28" placeholder="Description" />
                  </div>
                  <button className="btn btn-primary">Save</button>
            </form>
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
