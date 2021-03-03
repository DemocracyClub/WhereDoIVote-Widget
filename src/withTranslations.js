import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import messages_en from './translations/en';
import messages_cy from './translations/cy';

function withTranslations(Widget) {
  return function WidgetWithTranslations(props) {
    const messages = {
      en: messages_en,
      cy: messages_cy,
    };
    const languageOption = document.querySelector('#wdiv').getAttribute('data-language');
    const languageConfig = languageOption ? languageOption : 'en';
    const showLanguageToggle = languageOption ? true : false;
    const [language, setLanguage] = useState(languageConfig);
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <Widget
          {...props}
          setLanguage={setLanguage}
          locale={language}
          messages={messages[language]}
          showLanguageToggle={showLanguageToggle}
        />
      </IntlProvider>
    );
  };
}

export default withTranslations;
