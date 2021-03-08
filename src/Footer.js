import React from 'react';
import { BuiltBy } from './Branding';
import LanguageToggle from './LanguageToggle';

// function handleLogo(props) {
//   if (process.env.REACT_APP_BRAND === 'EC') {
//     return (
//       <footer>
//         <img
//           className="footer-logo"
//           src={'https://ukelectoralcommission.files.wordpress.com/2014/03/logo2.png'}
//           alt="Electoral Commission Logo"
//           width={'100px'}
//         />
//       </footer>
//     );
//   } else {
//     return (
//       <footer>
//         {props.showLanguageToggle && <LanguageToggle {...props} />}
//         <BuiltBy />
//       </footer>
//     );
//   }
// }

function Footer(props) {
  return (
    <footer>
      {props.showLanguageToggle && <LanguageToggle {...props} />}
      <BuiltBy />
    </footer>
  );
}

export default Footer;
