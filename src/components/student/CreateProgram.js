import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './ProgramStyle.css';

class CreateProgram extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          description: ''
        }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const title = this.getTitle.value;
      const description =  this.getDescription.value;
      const data = {
        title,
        description
      }

      this.props.createProgram(data, () => {
        this.props.history.push('/CreatePrograms');
      })
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
                 <h3>Créer un programme</h3>
                 <div className="form-group">
                    <label>Titre</label>
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
)(CreateProgram);
