import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/firebase';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
