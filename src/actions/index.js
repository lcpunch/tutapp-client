import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LIST_PROGRAMS } from './types';

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('https://tutapp-rs.herokuapp.com/api/login', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.success.token });
        localStorage.setItem('token', response.data.success.token);
        localStorage.setItem('user_id', response.data.id);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchPrograms = () => async dispatch => {
    try {
        let webApiUrl = 'https://tutapp-rs.herokuapp.com/api/userprograms/'+localStorage.getItem('user_id');
        let tokenStr = localStorage.getItem('token');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        
        var array = response.data.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });

        dispatch({ type: LIST_PROGRAMS, payload: array });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchCourses = (id) => async dispatch => {
    try {
        let webApiUrl = 'https://tutapp-rs.herokuapp.com/api/programs/'+id+'/courses';
        let tokenStr = localStorage.getItem('token');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        
        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchTutors = (id) => async dispatch => {
    try {
        let webApiUrl = 'https://tutapp-rs.herokuapp.com/api/courses/'+id+'/tutors';
        let tokenStr = localStorage.getItem('token');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchCalendars = (id) => async dispatch => {
    try {
        let webApiUrl = 'https://tutapp-rs.herokuapp.com/api/calendar/'+id+'/tutor';
        let tokenStr = localStorage.getItem('token');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    
    return {
        type: AUTH_USER,
        payload: ''
    }
};