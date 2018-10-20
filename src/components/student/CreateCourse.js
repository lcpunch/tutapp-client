import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './ProgramStyle.css';

class CreateCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          program_id: ''
        }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const title = this.getTitle.value;
      const program_id =  3;
      const data = {
        title,
        program_id
      }

      this.props.createCourse(data, () => {
        this.props.history.push('/CreateCourses');
      })

    }

    handleChange = (e) => {
      this.setState({
        title: e.target.value
      })
    }

    render() {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
                 <h3>Créer un course</h3>
                 <div className="form-group">
                    <label>Titre</label>
                    <input required type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      ref={(input)=>this.getTitle = input}
                      value={this.state.title} placeholder="Title"/>
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
)(CreateCourse);
