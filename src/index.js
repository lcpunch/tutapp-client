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
import Feature from './components/Courses';

const store = createStore(
  reducers,
 {},
 applyMiddleware(reduxThunk) 
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/courses" component={Feature} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
);
