import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signin from './components/auth/Signin';

ReactDOM.render(
  <Provider store={createStore(reducers, {})}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signin" exact component={Signin} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
);
