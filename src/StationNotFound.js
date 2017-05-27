import React from 'react';

function StationNotFound(props) {
    return (
        <div className="democracy_club_embed">
            <div className="card">
                <h2>We couldn't find your station!</h2>
                <div>
                    Get in touch with <b>{props.council.name}</b> <a href={props.council.website}>here</a>
                </div>

                 <a href="https://democracyclub.org.uk/" className="dc_logo">
                     Built by <img alt="Democracy Club" src="https://candidates.democracyclub.org.uk/static/img/logo-with-text.png"/>
                 </a>
            </div>
        </div>
    );
}

export default StationNotFound;