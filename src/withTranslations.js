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
    const [language, setLanguage] = useState('en');
    return (
      <IntlProvider locale={language} messages={messages[language]}>
        <Widget {...props} setLanguage={setLanguage} locale={language} />
      </IntlProvider>
    );
  };
}

export default withTranslations;
