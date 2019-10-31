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
      <h3 className="dc-notification-title">{props.title}</h3>
      {props.detail && <p>{props.detail}</p>}
      {props.url && (
        <a
          className="dc-btn-seconday"
          target="_blank"
          rel="noopener noreferrer"
          title="Read more information about this {props.title}"
          href={props.url}
        >
          Read More
        </a>
      )}
    </article>
  );
}

export { Notifications, Notification };
