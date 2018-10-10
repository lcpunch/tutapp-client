import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LIST_PROGRAMS } from './types';

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('https://tutapp-rs.herokuapp.com/api/login', formProps);

        dispatch({ type: AUTH_USER, payload: response.data.success.token });
        localStorage.setItem('token', response.data.success.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchPrograms = () => async dispatch => {
    try {
        let webApiUrl = 'https://tutapp-rs.herokuapp.com/api/programs';
        let tokenStr = localStorage.getItem('token');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchCourses = () => async dispatch => {
    try {
        let webApiUrl = 'https://tutapp-rs.herokuapp.com/api/courses';
        let tokenStr = localStorage.getItem('token');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    
    return {
        type: AUTH_USER,
        payload: ''
    }
};