import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import * as actions from '../../actions';

import './ProgramStyle.css';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          program_id: '',
          listprograms: [],
          role: '',
          number: '',
          password: ''
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
      const program_id =  this.state.program_id;
      const email =  this.getEmail.value;
      const role = this.state.role;
      const registration_number =  this.state.number;
      const password = this.getPassword.value;
      const data = {
        id: this.props.match.params.id,
        name,
        email,
        program_id,
        role,
        registration_number,
        password
      }

      this.props.editUser(data, () => {
        this.props.history.push('/');
      })
    }

    handleChange = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    handleChangeEmail = (e) => {
      this.setState({
        email: e.target.value
      })
    }

    handleChangePassword = (e) => {
      this.setState({
        password: e.target.value
      })
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
                     <label>Email:</label>
                     <input required type="text"
                       className="form-control"
                       onChange={this.handleChangeEmail}
                       ref={(input)=>this.getEmail = input}
                       value={this.state.email} />
                  </div>
                  <div className="form-group">
                     <label>Modifier mot de passe:</label>
                     <input type="password"
                       className="form-control"
                       onChange={this.handleChangePassword}
                       ref={(input)=>this.getPassword = input}
                       value={this.state.password} />
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
)(EditProfile);
