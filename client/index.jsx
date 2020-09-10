import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './container/App';
import { Login } from './container/Login';
import { Directory } from './container/Directory';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App component={Directory} />
  </React.StrictMode>,
  document.getElementById('root')
);
