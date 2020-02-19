import React, { useState } from 'react';

function withCandidates(Widget) {
  return function WidgetWithCandidates(props) {
    const renderTarget = document.getElementById('dc_wdiv');
    const enableCandidates = renderTarget.getAttribute('data-candidates') === 'true' ? true : false;
    const [ballots, setBallots] = useState(null);

    function handleCandidates(nextBallotDate) {
      if (enableCandidates && nextBallotDate) {
        setBallots(nextBallotDate.ballots);
      }
    }

    return (
      <Widget
        {...props}
        enableCandidates={enableCandidates}
        handleCandidates={handleCandidates}
        resetBallot={() => setBallots(null)}
        ballots={ballots}
      />
    );
  };
}

export default withCandidates;
