import React from 'react';

function Candidates(props) {
  return (
    <section className="Candidates" data-testid="candidates">
      <h1>Candidates for {props.candidates.ballot_title}</h1>
    </section>
  );
}

export default Candidates;
