import React from 'react';
import styles from './WidgetStyles';

function Notification(props) {
  return (
    <div role="alert" style={styles.DCNotification}>
      <span role="img">ℹ</span> {props.title} <a href={props.url}>Read More</a>
    </div>);
}

function IdRequirement(props) {
  if (!props.metadata) {
    return (null);
  }
  if ('voter_id' in props.metadata) {
    return (<Notification
      title={props.metadata['voter_id'].title}
      url={props.metadata['voter_id'].url}
    />);
  }
  return (null);
}

export { IdRequirement, Notification }
