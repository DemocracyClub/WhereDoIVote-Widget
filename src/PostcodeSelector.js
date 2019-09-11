import React from 'react';
import translations from './translations/en';

function isPostcodeValid(postcode) {
    if (typeof postcode !== 'string') {
        return false;
    } else if (postcode === undefined || postcode.replace(/\W/g, '').length === 0) {
        return false;
    } else if ((typeof postcode === 'string' && postcode.length > 10) || postcode.length < 5) {
        return false;
    } else {
        return true;
    }
}

function PostcodeSelector(props) {

    function updateErrorFromResponse(data) {
        props.setSearchInitiated(false);
        if (data.response !== undefined) {
            var err = data.response.data.message.replace(/.*: /g, '');
            if (data.response.status === 400) {
                if (err.startsWith('Postcode') && err.endsWith('is not valid.')) {
                    props.setCurrentError(err);
                } else if(err.startsWith('Could not') && err.endsWith('any source')) {  
                    props.setCurrentError('Could not geocode from any source')
                } else {
                    props.setCurrentError(translations['api.errors.voting-location-unknown']);
                }
            } else {
                props.setCurrentError(translations['api.errors.voting-location-unknown']);
            }
        } else {
            props.setCurrentError(translations['api.errors.lookup-service-down']);
        }
    }

    function getResponse(postcode) {
        props.api
            .getPostcodeData(postcode)
            .then(props.setPostcodeData)
            .catch(updateErrorFromResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let postcode = event.target[0].value;
        if (isPostcodeValid(postcode)) {
            props.setSearchInitiated(true);
            getResponse(postcode);
        } else {
            event.target[0].value = ''
            props.setCurrentError(translations['postcode.errors.invalid-postcode']);
            props.setSearchInitiated(false);
        }
    }

    return (
        <form className="PostcodeSelector" onSubmit={handleSubmit}>
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
export { isPostcodeValid };
export default PostcodeSelector;
