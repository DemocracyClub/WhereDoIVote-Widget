import React from 'react';

function WarningBanner(props) {
  if (props.dataSource !== 'prod') {
    return (
      <div className="ErrorMessage" role="alert">
        <span role="img" aria-label="warning">
          ⚠️
        </span>{' '}
        This application is serving <strong>{props.dataSource}</strong> data
      </div>
    );
  }
  return <></>;
}

export default WarningBanner;
