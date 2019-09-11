import React from 'react';
import styles from './WidgetStyles';

function EmbedCard(props) {
    return (
        <section style={styles.DCEmbed} className={props.className}>
            <div style={styles.Card}>{props.children}</div>
        </section>
    );
}

function StartAgainButton(props) {
    return (
        <button
            aria-label="Start again"
            title="Start again"
            onClick={props.onClick}
        >
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

export { EmbedCard, StartAgainButton, BuiltByDC };
