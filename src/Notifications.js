import React from 'react';

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
    <article className="Notification" data-testid="notification">
      <span role="img" alt="information">
        ℹ
      </span>
      <h4 className="eiw-notification-title">{props.title}</h4>
      {props.detail && <p style={{ whiteSpace: 'pre-wrap' }}>{props.detail}</p>}
      {props.url && (
        <a
          className="eiw-btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
          title={'Read more information about this ' + props.title}
          href={props.url}
        >
          Read More
        </a>
      )}
    </article>
  );
}

export { Notifications, Notification };
