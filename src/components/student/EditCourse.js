import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import * as actions from '../../actions';

import './ProgramStyle.css';

class EditCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
          title: '',
          program_id: '',
          listprograms: []
        }
    }

    componentWillMount() {
        this.props.fetchCourse(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(nextProps.program, this.state.program)) {
        this.setState({...this.state,
          title: nextProps.program.title,
          program_id: nextProps.program.program_id,
          listprograms: nextProps.program.listprograms
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const title = this.getTitle.value;
      const program_id =  this.getProgramId.value;
      const data = {
        id: this.props.match.params.id,
        title,
        program_id
      }

      this.props.editCourse(data, () => {
        this.props.history.push('/CreateCourses');
      })
    }

    handleChange = (e) => {
      this.setState({
        title: e.target.value
      })
    }

    handleProgramChange = (e) => {
      this.setState({
        program_id: e.target.value
      })
    }

    renderProgram(program) {
        return(
          <option key={program.id} value={program.id}> {program.title} </option>
        );
    }

    render() {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
                 <h3>Editer un course:</h3>
                 <div className="form-group">
                    <label>Titre</label>
                    <input required type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      ref={(input)=>this.getTitle = input}
                      value={this.state.title} />
                  </div>
                  <div className="form-group">
                    <label>Programme:</label>
                    <select className="form-control"
                      onChange={this.handleProgramChange}
                      ref={(input)=>this.getProgramId = input}
                      value={this.state.program_id}
                    >
                      {this.state.listprograms.map(this.renderProgram)}
                    </select>
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
)(EditCourse);
