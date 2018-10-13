import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AUTH_USER, LIST_PROGRAMS } from './actions/types';

import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signin from './components/auth/Signin';
import Programs from './components/Programs';
import Courses from './components/Courses';
import Tutors from './components/Tutors';
import Signout from './components/auth/Signout';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

const store = createStore(reducers, {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(loadingBarMiddleware({
    promiseTypeSuffixes: [AUTH_USER, LIST_PROGRAMS],
  }), reduxThunk) 
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signin" component={Signin} />
        <Route path="/programs" exact component={Programs} />
        <Route path="/programs/:id" component={Courses} />
        <Route path="/courses/:id" component={Tutors} />
        <Route path="/signout" component={Signout} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
);
