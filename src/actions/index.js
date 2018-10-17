import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { AUTH_USER, AUTH_ERROR, LIST_PROGRAMS } from './types';
import moment from 'moment';

const SERVER = 'https://tutapp-rs.herokuapp.com';
// const SERVER = 'http://localhost:8000';

export const signin = (formProps, callback) => async dispatch => {
    try {
        dispatch(showLoading());
        const response = await axios.post(SERVER+'/api/login', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.success.token });
        localStorage.setItem('token', response.data.success.token);
        localStorage.setItem('user_id', response.data.id);
        
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const fetchPrograms = () => async dispatch => {
    try {
        
        let webApiUrl = SERVER+'/api/userprograms/'+localStorage.getItem('user_id');
        let tokenStr = localStorage.getItem('token');
        
        dispatch(showLoading());
        
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        
        var array = response.data.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
  
        dispatch({ type: LIST_PROGRAMS, payload: array });
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const fetchCourses = (id) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/programs/'+id+'/courses';
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const fetchTutors = (id) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/courses/'+id+'/tutors';
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch(hideLoading());
        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const fetchCalendars = (id) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/calendar/'+id+'/tutor';
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        var array = response.data.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['dtavailability']).indexOf(obj['dtavailability']) === pos;
        });
        dispatch({ type: LIST_PROGRAMS, payload: array });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const fetchHours = (id, date) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/calendar/'+id+'/tutor/'+date;
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const saveTutorat = (calendar) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/tutorat/save';
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        await axios.post(webApiUrl, { 
            headers: {"Authorization" : `Bearer ${tokenStr}`}, 
            id_calendar: calendar.id,
            tutor_id: calendar.user_id,
            student_id: localStorage.getItem('user_id'),
            status: 0
        });
        webApiUrl = SERVER+'/api/calendar/'+calendar.user_id+'/tutor/'+calendar.dtavailability;
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const confirmTutorat = (calendar) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/tutorat/status/'+calendar.id;
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        await axios.post(webApiUrl, { 
            headers: {"Authorization" : `Bearer ${tokenStr}`}
        });
        webApiUrl = SERVER+'/api/tutorat/student/'+localStorage.getItem('user_id');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const saveCalendar = (event) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/calendar/save';
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());

        await axios.post(webApiUrl, { 
            headers: {"Authorization" : `Bearer ${tokenStr}`}, 
            dtavailability: moment(event.start).format("YYYY-MM-DD"),
            hrstart: moment(event.start).format("HH:mm"),
            hrfinish: moment(event.end).format("HH:mm"),
            user_id: localStorage.getItem('user_id')
        });
        
        webApiUrl = SERVER+'/api/calendar/'+localStorage.getItem('user_id')+'/tutor';
        
        const responseCalendars = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        
        dispatch({ type: LIST_PROGRAMS, payload: responseCalendars.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};


export const deleteTutorat = (tutorat) => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/tutorat/'+tutorat.id;
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());
        await axios.delete(webApiUrl, { 
            headers: {"Authorization" : `Bearer ${tokenStr}`}
        });
        webApiUrl = SERVER+'/api/tutorat/student/'+localStorage.getItem('user_id');
        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
        dispatch({ type: LIST_PROGRAMS, payload: response.data });

    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const fetchTutorats = () => async dispatch => {
    try {
        let webApiUrl = SERVER+'/api/tutorat/student/'+localStorage.getItem('user_id');
        let tokenStr = localStorage.getItem('token');
        dispatch(showLoading());

        const response = await axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });

        dispatch({ type: LIST_PROGRAMS, payload: response.data });
        
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
    dispatch(hideLoading());
};

export const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    
    return {
        type: AUTH_USER,
        payload: ''
    }
};