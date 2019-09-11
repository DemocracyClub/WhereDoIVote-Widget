import React from 'react';

function PostcodeSelector(props) {

    function findStation(postcode) {
        console.log(postcode);
    }

    function isPostcodeValid(postcode) {
        if (postcode === undefined || postcode.replace(/\W/g, '').length === 0) {
            props.setSearchInitiated(false);
            return false;
        } else {
            return true;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.setSearchInitiated(true);
        let postcode = event.target[0].value;
        if (isPostcodeValid(postcode)) {
            findStation(postcode);
        }
    }

    return (
        <form className="PostcodeSelector" onSubmit={handleSubmit}>
            {props.error && (
                <span id="dc_error" className="dc_error">
                    {props.error}
                </span>
            )}
            <div className="form-group">
                <label className="form-label-bold" htmlFor="postcode">
                    Enter your postcode
                </label>
                <input type="text" id="postcode" name="postcode" className="form-control" />
            </div>
            <button type="submit">Find your polling station</button>
        </form>
    );
}

export default PostcodeSelector;
