import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class Signin extends Component {
  render() {
    return (
      <form>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autocomplete="none"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autocomplete="none"
          />
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({ form:'signin' })(Signin);
