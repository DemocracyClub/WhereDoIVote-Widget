import React from 'react';
import styles from './WidgetStyles';

function EmbedCard(props) {
    return (
        <section style={styles.DCEmbed} className={props.className}>
            <div style={styles.Card}>{props.children}</div>
        </section>
    );
}

function ErrorMessage(props) {
    return (
        <div className="ErrorMessage" id="dc_error" style={styles.DCError} role="alert">
            {props.currentError}
            <button title="Dismiss error" aria-label="Dismiss error" onClick={props.clearError}>
                Close
            </button>
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

function BuiltByDC() {
    return (
        <footer>
            <a
                href="https://democracyclub.org.uk/"
                title="Democracy Club"
                target="_top"
                style={styles.DCLogo}
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

export { EmbedCard, StartAgainButton, BuiltByDC, ErrorMessage };
