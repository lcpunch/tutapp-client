import axios from 'axios';
import { AUTH_USER } from './types';

export const signin = formProps => dispatch => {
    axios.post('https://tutapp-rs.herokuapp.com/api/login', formProps);
};
