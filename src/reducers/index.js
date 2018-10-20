import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import program from './program';
import course from './course';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  auth,
  program,
  course,
  loadingBar: loadingBarReducer,
  form: formReducer
});
