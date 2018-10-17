import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signin from './components/auth/Signin';
import Programs from './components/student/Programs';
import Courses from './components/student/Courses';
import Tutors from './components/student/Tutors';
import Signout from './components/auth/Signout';
import Calendars from './components/student/Calendars';
import Hours from './components/student/Hours';
import Tutorats from './components/student/Tutorats';
import CalendarsConfig from './components/tutor/CalendarsConfig';
import CreatePrograms from './components/student/CreatePrograms';
import EditProgram from './components/student/EditProgram';

const store = createStore(reducers, {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signin" component={Signin} />
        <Route path="/programs" exact component={Programs} />
        <Route path="/createPrograms" exact component={CreatePrograms} />
        <Route path="/editProgram/:id" component={EditProgram} />
        <Route path="/tutorats" exact component={Tutorats} />
        <Route path="/calendars" exact component={CalendarsConfig} />
        <Route path="/programs/:id" component={Courses} />
        <Route path="/courses/:id" component={Tutors} />
        <Route path="/tutor/:id" component={Calendars} />
        <Route path="/calendar/:id/:date" component={Hours} />
        <Route path="/signout" component={Signout} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
);
