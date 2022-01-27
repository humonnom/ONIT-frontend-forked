import React from 'react';
import ReactDOM from 'react-dom';
import './font.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/slice';
import reportWebVitals from './reportWebVitals';

require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // eslint-disable-next-line comma-dangle
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
