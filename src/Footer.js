import React from 'react';
import { BuiltByDC } from './Branding';
import LanguageToggle from './LanguageToggle';

function handleLogo(props) {
  if (process.env.REACT_APP_API === 'mock_ec') {
    return (
      <footer>
        <img
          src={'https://ukelectoralcommission.files.wordpress.com/2014/03/logo2.png'}
          alt="Electoral Commission Logo"
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

function Footer(props) {
  return <footer>{handleLogo(props)}</footer>;
}

export default Footer;
