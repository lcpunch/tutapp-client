import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import program from './program';
import calendar from './calendar';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  auth,
  program,
  calendar,
  loadingBar: loadingBarReducer,
  form: formReducer
});
