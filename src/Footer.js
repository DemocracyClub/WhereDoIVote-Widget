import React from 'react';
import { BuiltByDC } from './Branding';
import LanguageToggle from './LanguageToggle';

function Footer(props) {
  console.debug(process);
  if (process.env.REACT_APP_BRAND === 'EC') {
    return (
      <footer>
        <img
          src={'https://ukelectoralcommission.files.wordpress.com/2014/03/logo2.png'}
          width={'100px'}
        />
      </footer>
    );
  } else {
    return (
      <footer>
        {props.showLanguageToggle && <LanguageToggle {...props} />}
        <BuiltByDC />
      </footer>
    );
  }
}

export default Footer;
