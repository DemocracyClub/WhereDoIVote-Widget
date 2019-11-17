import React, { useState } from 'react';

function withCandidates(Widget) {
  return function WidgetWithCandidates(props) {
    const renderTarget = document.getElementById('dc_wdiv');
    const enableCandidates = renderTarget.getAttribute('data-candidates') === 'true' ? true : false;
    const candidateCheckbox =
      renderTarget.getAttribute('data-candidates-start-state') === 'unticked' ? false : true;

    const [showCandidates, setShowCandidates] = useState(candidateCheckbox);
    const [candidates, setCandidates] = useState(null);

    function handleCandidates(nextBallotDate) {
      if (showCandidates && nextBallotDate) {
        const geBallot = nextBallotDate.ballots.filter(
          ballot => ballot.election_id === 'parl.2019-12-12'
        );
        const generalElection = geBallot[0];
        if (generalElection) {
          generalElection.candidates_verified && setCandidates(generalElection);
        }
      }
    }

    return (
      <Widget
        {...props}
        showCandidates={showCandidates}
        setShowCandidates={setShowCandidates}
        enableCandidates={enableCandidates}
        candidateCheckbox={candidateCheckbox}
        handleCandidates={handleCandidates}
        resetCandidates={() => setCandidates(null)}
        candidates={candidates}
      />
    );
  };
}

export default withCandidates;
