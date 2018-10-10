import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push('/programs');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <Field
              name="email"
              className="form-control"
              type="text"
              component="input"
              placeholder="Enter email"
              autoComplete="none"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field
              name="password"
              className="form-control"
              type="password"
              component="input"
              placeholder="Enter password"
              autoComplete="none"
            />
          </div>
          <div>
            {this.props.errorMessage}
          </div>
          <button className="btn btn-primary">
            Sign In!
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form:'signin' })
)(Signin);

