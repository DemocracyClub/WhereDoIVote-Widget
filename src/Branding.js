import React from 'react';
import { injectIntl } from 'react-intl';

function ErrorMessageTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <div className="ErrorMessage" id="eiw-error" role="alert" aria-live="assertive">
      {props.currentError && formatMessage({ id: props.currentError })}
    </div>
  );
}

const ErrorMessage = injectIntl(ErrorMessageTemplate);

function StartAgainButtonTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <button
      className="eiw-btn-secondary"
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

function BuiltByTemplate(props) {
  const { formatMessage } = props.intl;
  const accessibleTitle = `${formatMessage({ id: 'general.visit-website-of' })} ${formatMessage({
    id: 'general.dc-club',
  })}`;
  return (
    <>
      <a
        href={
          process.env.REACT_APP_BRAND === 'EC'
            ? 'https://electoralcommission.org.uk/'
            : 'https://democracyclub.org.uk/'
        }
        title={process.env.REACT_APP_BRAND === 'EC' ? '' : { accessibleTitle }}
        target="_top"
        className="Logo"
      >
        {process.env.REACT_APP_BRAND === 'EC' ? '' : formatMessage({ id: 'general.built-by' })}
        <img
          alt={
            process.env.REACT_APP_BRAND === 'EC'
              ? formatMessage({ id: 'general.ec' })
              : formatMessage({ id: 'general.dc-club' })
          }
          src={
            process.env.REACT_APP_BRAND === 'EC'
              ? 'https://ukelectoralcommission.files.wordpress.com/2014/03/logo2.png'
              : 'https://widget.wheredoivote.co.uk/logo-with-text.png'
          }
          width="120px"
        />
      </a>
    </>
  );
}
const BuiltBy = injectIntl(BuiltByTemplate);

export { StartAgainButton, BuiltBy, ErrorMessage, Loader };
