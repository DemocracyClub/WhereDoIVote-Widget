import React from 'react';
import ShadowDOM from 'react-shadow';

function ShadowDomFactory(props) {
  function shouldUseShadowDom() {
    if (process.env.REACT_APP_TESTING) {
      return false;
    }
    return typeof document.body.attachShadow === 'function';
  }

  return (
    <>
      {shouldUseShadowDom() ? <ShadowDOM>{props.children}</ShadowDOM> : <div>{props.children}</div>}
    </>
  );
}

export default ShadowDomFactory;
