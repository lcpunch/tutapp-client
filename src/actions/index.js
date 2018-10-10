import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('https://tutapp-rs.herokuapp.com/api/login', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.success.token });
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Incorrect login or password' });
    }
};
