import React, { useState } from 'react';

function withCandidates(Widget) {
  return function WidgetWithCandidates(props) {
    const renderTarget = document.getElementById('dc_wdiv');
    const enableCandidates = renderTarget.getAttribute('data-candidates') === 'true' ? true : false;
    const [ballot, setBallot] = useState(null);

    function handleCandidates(nextBallotDate) {
      if (enableCandidates && nextBallotDate) {
        const geBallot = nextBallotDate.ballots.filter(
          ballot => ballot.election_id === 'parl.2019-12-12'
        );
        const generalElection = geBallot[0];
        if (generalElection) {
          generalElection.candidates_verified &&
            !generalElection.cancelled &&
            setBallot(generalElection);
        }
      }
    }

    return (
      <Widget
        {...props}
        enableCandidates={enableCandidates}
        handleCandidates={handleCandidates}
        resetBallot={() => setBallot(null)}
        ballot={ballot}
      />
    );
  };
}

export default withCandidates;
