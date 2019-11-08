import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import messages_en from './translations/en.json';
import messages_cy from './translations/cy.json';

function withTranslations(Widget) {
  return function WidgetWithTranslations(props) {
    const messages = {
      en: messages_en,
      cy: messages_cy,
    };
    const languageOption = document.querySelector('#dc_wdiv').getAttribute('data-language');
    const languageConfig = languageOption ? languageOption : 'en';
    const showLanguageToggle = document
      .querySelector('#dc_wdiv')
      .getAttribute('data-language-toggle');
    const [language, setLanguage] = useState(languageConfig);
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <Widget
          {...props}
          setLanguage={setLanguage}
          locale={language}
          showLanguageToggle={showLanguageToggle}
        />
      </IntlProvider>
    );
  };
}

export default withTranslations;
