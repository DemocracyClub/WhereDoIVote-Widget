import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'es6-shim';
import 'proxy-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ElectionInformationWidget from './ElectionInformationWidget';
import cssVars from 'css-vars-ponyfill';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

cssVars({
  include: 'style',
  exclude: 'link',
});

ReactDOM.render(<ElectionInformationWidget />, document.getElementById('wdiv'));
