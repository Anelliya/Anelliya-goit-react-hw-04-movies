import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

export const base_url = 'https://api.themoviedb.org/3/';
export const api_key = '50b81e1c6c3b9e5f74d2015b742ff0b0';

ReactDOM.render(
  <BrowserRouter >
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </BrowserRouter>,
  document.getElementById('root')

);


