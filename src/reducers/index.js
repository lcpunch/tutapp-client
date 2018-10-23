import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import program from './program';
import course from './course';
import calendar from './calendar';
import user from './user';
import profile from './profile'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  auth,
  program,
  course,
  user,
  calendar,
  profile,
  loadingBar: loadingBarReducer,
  form: formReducer
});
