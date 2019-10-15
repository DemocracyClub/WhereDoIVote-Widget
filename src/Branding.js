import React from 'react';

function EmbedCard(props) {
    return (
        <section className={props.className}>
            <div className="Card">{props.children}</div>
        </section>
    );
}

function ErrorMessage(props) {
    return (
        <div className="ErrorMessage" id="dc_error" role="alert">
            {props.currentError}
        </div>
    );
}

function StartAgainButton(props) {
    return (
        <button aria-label="Start again" title="Start again" onClick={props.onClick}>
            Back to postcode search
        </button>
    );
}

function Loader() {
    return (
        <div className="Loader" role="alert">
            Loading
        </div>
    );
}

function BuiltByDC() {
    return (
        <footer>
            <a
                href="https://democracyclub.org.uk/"
                title="Democracy Club"
                target="_top"
                className="DCLogo"
            >
                Built by{' '}
                <img
                    alt="Democracy Club"
                    src="https://widget.wheredoivote.co.uk/logo-with-text.png"
                />
            </a>
        </footer>
    );
}

export { EmbedCard, StartAgainButton, BuiltByDC, ErrorMessage, Loader };
