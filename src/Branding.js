import React from 'react';
import { injectIntl } from 'react-intl';

function ErrorMessage(props) {
  return (
    <div className="ErrorMessage" id="dc_error" role="alert" aria-live="assertive">
      {props.currentError}
    </div>
  );
}

function StartAgainButtonTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <button
      className="dc-btn-seconday"
      aria-label={formatMessage({ id: 'general.start-again' })}
      title={formatMessage({ id: 'general.start-again' })}
      onClick={props.onClick}
    >
      {formatMessage({ id: 'postcode.back-to-search' })}
    </button>
  );
}

const StartAgainButton = injectIntl(StartAgainButtonTemplate);

function LoaderTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <div className="loading-spinner" role="alert" aria-live="assertive">
      <p className="screen-reader-text" aria-hidden="false">
        {formatMessage({ id: 'general.loading' })}
      </p>
    </div>
  );
}

const Loader = injectIntl(LoaderTemplate);

function BuiltByDCTemplate(props) {
  const { formatMessage } = props.intl;
  const accessibleTitle = `${formatMessage({ id: 'general.visit-website-of' })} ${formatMessage({
    id: 'general.dc-club',
  })}`;
  return (
    <>
      <a
        href="https://democracyclub.org.uk/"
        title={accessibleTitle}
        target="_top"
        className="DCLogo"
      >
        {formatMessage({ id: 'general.built-by' })}
        <img alt={formatMessage({ id: 'general.dc-club' })} src="/img/logo-with-text.png" />
      </a>
    </>
  );
}
const BuiltByDC = injectIntl(BuiltByDCTemplate);

export { StartAgainButton, BuiltByDC, ErrorMessage, Loader };
