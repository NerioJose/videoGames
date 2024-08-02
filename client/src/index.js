import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';
import axios from 'axios'

//axios.defaults.baseURL = 'https://api.rawg.io/api';
axios.defaults.baseURL = 'https://server-videogames-u20k.onrender.com';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);