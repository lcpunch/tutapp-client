import { FETCH_ALL_USERS, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return { ...state, data: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload.data };
    default:
      return state;
  }
}
