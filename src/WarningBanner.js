import React from 'react';

function WarningBanner(props) {
  return (
    <>
      {props.dataSource !== 'prod' && (
        <div data-testid="data-warning" className="ErrorMessage" role="alert">
          <span data-testid="warning-emoji" role="img" aria-label="warning">
            ⚠️
          </span>{' '}
          This application is serving <strong>{props.dataSource}</strong> data
        </div>
      )}
    </>
  );
}

export default WarningBanner;
