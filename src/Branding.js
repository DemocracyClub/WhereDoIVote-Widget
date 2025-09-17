import React from 'react';
import { injectIntl } from 'react-intl';

function ErrorMessageTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <div className="ErrorMessage" data-testid="eiw-error" role="alert" aria-live="assertive">
      {props.currentError && formatMessage({ id: props.currentError })}
    </div>
  );
}

const ErrorMessage = injectIntl(ErrorMessageTemplate);

function StartAgainButtonTemplate(props) {
  const { formatMessage } = props.intl;
  return (
    <section>
      <button
        className="eiw-btn-secondary"
        aria-label={formatMessage({ id: 'general.start-again' })}
        title={formatMessage({ id: 'general.start-again' })}
        onClick={props.onClick}
      >
        {formatMessage({ id: 'postcode.back-to-search' })}
      </button>
    </section>
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
  return (
    <div>
      <a
        href={
          process.env.REACT_APP_BRAND === 'EC'
            ? 'https://electoralcommission.org.uk/'
            : 'https://democracyclub.org.uk/'
        }
        target="_top"
        className="Logo"
      >
        <img
          alt={process.env.REACT_APP_BRAND === 'EC' ? formatMessage({ id: 'general.ec' }) : ''}
          src={
            process.env.REACT_APP_BRAND === 'EC'
              ? 'https://ukelectoralcommission.files.wordpress.com/2014/03/logo2.png'
              : process.env.PUBLIC_URL + '/img/logo.svg'
          }
          width={process.env.REACT_APP_BRAND === 'EC' ? '120px' : '40px'}
        />
        {process.env.REACT_APP_BRAND === 'EC' ? (
          ''
        ) : (
          <span className="LogoText">democracy club</span>
        )}
      </a>
    </div>
  );
}
const BuiltBy = injectIntl(BuiltByTemplate);

export { StartAgainButton, BuiltBy, ErrorMessage, Loader };
