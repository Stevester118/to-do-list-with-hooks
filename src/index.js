import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './List';
import Store from './Store';

ReactDOM.render (
  <Store>
    <List />
  </Store>
  ,
  document.getElementById('root')
    );
