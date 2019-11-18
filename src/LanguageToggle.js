import React from 'react';

function LanguageToggle(props) {
  function toggleLanguage(e) {
    props.setLanguage(e.target.value);
  }
  return (
    <form className="LanguageToggle">
      <label>
        <input
          data-testid="cy-selector"
          type="radio"
          name="language"
          value="cy"
          onChange={toggleLanguage}
          checked={props.locale === 'cy'}
        />
        Cymraeg
      </label>
      <label>
        <input
          data-testid="en-selector"
          type="radio"
          name="language"
          value="en"
          onChange={toggleLanguage}
          checked={props.locale === 'en'}
        />
        English
      </label>
    </form>
  );
}

export default LanguageToggle;
