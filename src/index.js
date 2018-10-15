import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signin from './components/auth/Signin';
import Programs from './components/Programs';
import Courses from './components/Courses';
import Tutors from './components/Tutors';
import Signout from './components/auth/Signout';
import Calendars from './components/Calendars';
import Hours from './components/Hours';
import Tutorats from './components/Tutorats';

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
        <Route path="/tutorats" exact component={Tutorats} />
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
