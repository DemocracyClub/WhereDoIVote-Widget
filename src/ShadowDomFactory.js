import React from 'react';
import root from 'react-shadow';

function ShadowDomFactory(props) {
  function shouldUseShadowDom() {
    if (process.env.REACT_APP_TESTING) {
      return false;
    }
    return typeof document.body.attachShadow === 'function';
  }

  return (
    <>
      {shouldUseShadowDom() ? <root.div> {props.children} </root.div> : <div>{props.children}</div>}
    </>
  );
}

export default ShadowDomFactory;
