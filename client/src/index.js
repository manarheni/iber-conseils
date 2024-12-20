import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import store from './store'
import { Provider } from 'react-redux';
import App from './App';
import './fonts/Roboto/Roboto-Regular.ttf';
import './fonts/Cairo/Cairo-Regular.ttf';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);


serviceWorkerRegistration.register();
