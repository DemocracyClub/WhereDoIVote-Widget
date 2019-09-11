import React from 'react';

function isPostcodeValid(postcode) {
    if (typeof postcode !== String) {
        return false
    } else if (postcode === undefined || postcode.replace(/\W/g, '').length === 0) {
        return false;
    } else if (typeof postcode === String && postcode.length > 10) {
        return false;
    } else {
        return true;
    }

}

function PostcodeSelector(props) {
    function findStation(postcode) {
        console.log(postcode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.setSearchInitiated(true);
        let postcode = event.target[0].value;
        if (isPostcodeValid(postcode)) {
            findStation(postcode);
        } else {
            props.setSearchInitiated(false);
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
export { isPostcodeValid }
export default PostcodeSelector;
