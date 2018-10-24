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

    componentDidMount() {
         this.props.fetchAllPrograms();
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const title = this.getTitle.value;
      const program_id = this.getProgramId.value;
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

      if(!Array.isArray(this.props.program) || this.props.program.length < 1) {
        return <div>Loading...</div>;
      }

      return (
        <div className="container">
          <form onSubmit={this.handleSubmit}>
               <h3>Créer un course</h3>
               <div className="form-group">
                  <label>Titre:</label>
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
                    ref={(input)=>this.getProgramId = input}>
                    <option value=""></option>
                    {this.props.program.map(this.renderProgram)}
                  </select>
                </div>
                <button className="btn btn-primary">Sauvegarder</button>
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
