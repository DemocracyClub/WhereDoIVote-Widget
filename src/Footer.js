import React from 'react';
import { BuiltByDC } from './Branding';
import LanguageToggle from './LanguageToggle';

function Footer(props) {
  return (
    <footer>
      {props.showLanguageToggle && <LanguageToggle {...props} />}
      <BuiltByDC />
    </footer>
  );
}

export default Footer;
