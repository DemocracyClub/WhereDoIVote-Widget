import React from 'react';
import { BuiltByDC } from './Branding';
import LanguageToggle from './LanguageToggle';

function Footer(props) {
  return (
    <footer>
      <LanguageToggle {...props} />
      <BuiltByDC />
    </footer>
  );
}

export default Footer;
