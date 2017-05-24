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
                    <a href={"http://www.google.com/maps/place/@" + props.pollingStation.coordinates + ",20z"} target="_top">
                        Get walking directions
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;