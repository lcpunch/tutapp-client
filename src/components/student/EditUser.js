import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import * as actions from '../../actions';

import './ProgramStyle.css';

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          program_id: '',
          listprograms: [],
          role: '',
          number: ''
        }
    }

    componentWillMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(nextProps.program, this.state.program)) {
        this.setState({...this.state,
          name: nextProps.program.name,
          email: nextProps.program.email,
          program_id: nextProps.program.program_id,
          listprograms: nextProps.program.listprograms,
          role: nextProps.program.role,
          number: nextProps.program.registration_number
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const name = this.getName.value;
      const program_id =  this.getProgramId.value;
      const email =  this.getEmail.value;
      const role = this.getRole.value;
      const registration_number =  this.getNumber.value;
      const data = {
        id: this.props.match.params.id,
        name,
        email,
        program_id,
        role,
        registration_number
      }

      this.props.editUser(data, () => {
        this.props.history.push('/CreateUsers');
      })
    }

    handleChange = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    handleNumberChange = (e) => {
      this.setState({
        number: e.target.value
      })
    }

    handleChangeEmail = (e) => {
      this.setState({
        email: e.target.value
      })
    }

    handleProgramChange = (e) => {
      this.setState({
        program_id: e.target.value
      })
    }

    handleRoleChange = (e) => {
      this.setState({
        role: e.target.value
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
                 <h3>Editer un utilizateur:</h3>
                 <div className="form-group">
                    <label>Nom:</label>
                    <input required type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      ref={(input)=>this.getName = input}
                      value={this.state.name} />
                  </div>
                  <div className="form-group">
                     <label>Numero:</label>
                     <input required type="text"
                       className="form-control"
                       onChange={this.handleNumberChange}
                       ref={(input)=>this.getNumber = input}
                       value={this.state.number} />
                   </div>
                  <div className="form-group">
                     <label>Email:</label>
                     <input required type="text"
                       className="form-control"
                       onChange={this.handleChangeEmail}
                       ref={(input)=>this.getEmail = input}
                       value={this.state.email} />
                  </div>
                  <div className="form-group">
                    <label>Programme:</label>
                    <select className="form-control"
                      onChange={this.handleProgramChange}
                      value={this.state.program_id}
                      ref={(input)=>this.getProgramId = input}>
                      {this.state.listprograms.map(this.renderProgram)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <select className="form-control"
                      onChange={this.handleRoleChange}
                      value={this.state.role}
                      ref={(input)=>this.getRole = input}>
                        <option key="2" value="2"> Tutor </option>
                        <option key="3" value="3"> Élèves </option>
                    </select>
                  </div>
                  <button className="btn btn-primary">Save</button>
            </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return { program: state.profile.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(EditUser);
