import React from 'react';

function withCandidates(Widget) {
  return function WidgetWithCandidates(props) {
    const renderTarget = document.getElementById('dc_wdiv');
    const enableCandidates = renderTarget.getAttribute('data-candidates') === 'true' ? true : false;

    return <Widget {...props} enableCandidates={enableCandidates} />;
  };
}

export default withCandidates;
