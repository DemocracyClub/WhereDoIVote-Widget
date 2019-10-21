import 'es6-shim';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'proxy-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DemocracyClubWidget from './DemocracyClubWidget';

ReactDOM.render(<DemocracyClubWidget />, document.getElementById('dc_wdiv'));
