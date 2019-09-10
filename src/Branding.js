import React from 'react';
import styles from './WidgetStyles';

function EmbedCard(props) {
    return (
        <section style={styles.DCEmbed}>
            <div style={styles.Card}>{props.children}</div>
        </section>
    );
}

function BuiltByDC() {
    return (
        <footer>
            <a href="https://democracyclub.org.uk/" target="_top" style={styles.DCLogo}>
                Built by{' '}
                <img
                    alt="Democracy Club"
                    src="https://widget.wheredoivote.co.uk/logo-with-text.png"
                />
            </a>
        </footer>
    );
}

export { EmbedCard, BuiltByDC };
