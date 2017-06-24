import React from 'react';

function EmbedCard(props) {
    return <div className="democracy_club_embed">
               <div className="card">
                 {props.children}
               </div>
           </div>;
}

function BuiltByDC(props) {
    return  <div>
                <a href="https://democracyclub.org.uk/" target="_top" className="dc_logo">
                Built by <img alt="Democracy Club" src="https://widget.wheredoivote.co.uk/logo-with-text.png"/>
                </a>
            </div>;
}

export { EmbedCard, BuiltByDC };
