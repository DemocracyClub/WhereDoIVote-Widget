import React from 'react';
import styles from './WidgetStyles';

function Notification(props) {
    return (
        <div role="alert" style={styles.DCNotification}>
            <span role="img">ℹ</span> {props.title} <a href={props.url}>Read More</a>
            {props.detail && <p>{props.detail}</p>}
        </div>
    );
}

export default Notification;
