import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import program from './program';

export default combineReducers({
  auth,
  program,
  form: formReducer
});
