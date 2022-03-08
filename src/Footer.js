import React from 'react';
import { BuiltBy } from './Branding';
import LanguageToggle from './LanguageToggle';

function Footer(props) {
  return (
    <footer>
      {props.showLanguageToggle && <LanguageToggle {...props} />}
      <BuiltBy />
    </footer>
  );
}

export default Footer;
