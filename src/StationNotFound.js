import React from 'react';

function StationNotFound(props) {
    return (
        <div className="democracy_club_embed">
            <div className="card">
                <h2>We couldn't find your station</h2>
                <div>
                    Get in touch with <b>{props.council.name}</b>:
                     <br/>
                     <br/>
                     <ul>
                        <li>Website - <a href={props.council.website}>{props.council.website}</a></li>
                        <li>Phone - {props.council.phone}</li>
                        <li>Email - <a href={"mailto:"+props.council.email}>{props.council.email}</a></li>
                     </ul>
                     <br/>

                 </div>
                 <button href="#" onClick={props.home}>Back to postcode search</button>

                <div>
                    <a href="https://democracyclub.org.uk/" target="_top" className="dc_logo">
                    Built by <img alt="Democracy Club" src="https://candidates.democracyclub.org.uk/static/img/logo-with-text.png"/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default StationNotFound;