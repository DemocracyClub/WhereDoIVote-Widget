import React from 'react';

function Notification(props) {
  return (
    <div className="dc_notification">
      <span role="img">ℹ</span> {props.title} <a href={props.url}>Read More</a>
    </div>);
}

export { Notification }
