import React from 'react';
import { FormattedMessage } from 'react-intl';

function ErrorMessage(props) {
  return (
    <div className="ErrorMessage" id="dc_error" role="alert" aria-live="assertive">
      {props.currentError}
    </div>
  );
}

function StartAgainButton(props) {
  return (
    <button
      className="dc-btn-seconday"
      aria-label="Start again"
      title="Start again"
      onClick={props.onClick}
    >
      Back to postcode search
    </button>
  );
}

function Loader() {
  return (
    <div className="loading-spinner" role="alert" aria-live="assertive">
      <p className="screen-reader-text" aria-hidden="false">
        Loading
      </p>
    </div>
  );
}

function BuiltByDC() {
  return (
    <>
      <a
        href="https://democracyclub.org.uk/"
        title="Democracy Club"
        target="_top"
        className="DCLogo"
      >
        <FormattedMessage id="general.built-by" description="Built by" />
        <img alt="Democracy Club" src="https://widget.wheredoivote.co.uk/logo-with-text.png" />
      </a>
    </>
  );
}

export { StartAgainButton, BuiltByDC, ErrorMessage, Loader };
