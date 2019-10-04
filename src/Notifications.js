import React from 'react';
import styles from './WidgetStyles';

function Notifications(props) {
    if (!props.list) {
        return null;
    } else {
        return props.list.map((n, i) => (
            <Notification key={i} title={n.title} url={n.url} detail={n.detail} />
        ));
    }
}

function Notification(props) {
    return (
        <div data-testid="notification" role="alert" style={styles.DCNotification}>
            <span role="img">ℹ</span> {props.title} {props.url && <a target="_blank" rel="noopener noreferrer" href={props.url}>Read More</a>}
            {props.detail && <p>{props.detail}</p>}
        </div>
    );
}

export { Notifications, Notification };
