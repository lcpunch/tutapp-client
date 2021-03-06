import { AUTH_USER, AUTH_ERROR, USER_DATA } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  user_data: {},
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DATA:
      return { ...state, user_data: action.payload };
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
