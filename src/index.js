import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'es6-shim';
import 'proxy-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ElectionInformationWidget from './ElectionInformationWidget';
import cssVars from 'css-vars-ponyfill';

/*
Use @formatjs/intl-datetimeformat to polyfill Welsh locale
pack for browsers that don't have it.
For example, Chrome doesn't ship with cy locale by default.

If we need to add number formatting in future,
we will need to add @formatjs/intl-numberformat here
*/
import '@formatjs/intl-datetimeformat/polyfill-force.js';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/cy';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

cssVars({
  include: 'style',
  exclude: 'link',
});

ReactDOM.render(<ElectionInformationWidget />, document.getElementById('dc_wdiv'));
