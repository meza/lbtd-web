import {hot} from 'react-hot-loader/root';
import React from 'react';
import {render} from 'react-dom';
import App from './App';

const HotApp = hot(App);

render(
  <HotApp/>,
  document.getElementById('root')
);
