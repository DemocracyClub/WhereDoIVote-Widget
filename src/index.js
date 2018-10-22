import 'es6-shim';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './Widget';

ReactDOM.render(<Widget />, document.getElementById('dc_wdiv'))
