import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './SignUpStyle.css';

class Signin extends Component {

  onSubmit = (formProps) => {
    this.props.signin(formProps, (route) => {
      this.props.history.push(route);
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Se connecter dans mon compte</h5>
                <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
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
                    <label>Mot de passe</label>
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
                  <button className="btn btn-lg btn-primary btn-block text-uppercase">
                    Se Connecter
                  </button>
                </form>
                </div>
              </div>
            </div>
         </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form:'signin' })
)(Signin);
