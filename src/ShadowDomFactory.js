import React from 'react';
import root from 'react-shadow';

function ShadowDomFactory(props) {
    return (
        <>
            {process.env.REACT_APP_TESTING && <div className="DCWidget">{props.children}</div>}
            {!process.env.REACT_APP_TESTING && (
                <root.div className="DCWidget">{props.children}</root.div>
            )}
        </>
    );
}

export default ShadowDomFactory;
