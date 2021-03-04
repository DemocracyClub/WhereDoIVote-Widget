import React from 'react';

function withElections(Widget) {
  return function WidgetWithElections(props) {
    const el = document.getElementById('dc_wdiv');
    const enableCandidates = el.getAttribute('data-candidates') === 'true' ? true : false;
    // fall-back to enableCandidates below for backwards support
    const enableElections = el.getAttribute('data-elections') === 'true' ? true : enableCandidates;
    return <Widget {...props} enableElections={enableElections} />;
  };
}

export default withElections;
