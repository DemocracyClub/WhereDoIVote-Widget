import React from 'react';

function ResultsCard(props) {
    return (
        <div className="democracy_club_embed">
            <div className="card">
                <h2>Your polling station</h2>
                <div>
                    {props.pollingStation.address}
                </div>

                <div id="directions">
                    <a href={"https://maps.google.com/maps?q=" + props.pollingStation.coordinates} target="_top">
                        Show me on Google Maps
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;