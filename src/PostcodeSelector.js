import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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
  let [formValue, setFormValue] = useState('');

  function handleFormChange(event) {
    setFormValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let postcode = formValue;
    handlePostcode(postcode);
  }

  function handlePostcode(postcode) {
    if (isPostcodeValid(postcode)) {
      props.setSearchInitiated(true);
      props.lookupGivenPostcode(postcode);
    } else {
      setFormValue('');
      props.setCurrentError('postcode.errors.invalid-postcode');
      props.setSearchInitiated(false);
    }
  }

  return (
    <form className="PostcodeSelector" onSubmit={handleSubmit} data-testid="postcode-selector">
      <div className="form-group">
        <h2>
          <label className="form-label-bold" htmlFor="postcode">
            <FormattedMessage id="postcode.enter-postcode" description="Enter your postcode" />
          </label>
        </h2>

        <input
          value={formValue}
          onChange={handleFormChange}
          type="text"
          id="postcode"
          name="postcode"
          className="form-control"
        />
      </div>
      <button className="eiw-btn-primary" type="submit">
        {!props.enableElections && (
          <FormattedMessage
            id="postcode.submit-postcode-polling-station"
            description="Find your polling station"
          />
        )}
        {props.enableElections && (
          <FormattedMessage
            id="postcode.submit-postcode-general"
            description="Find election information"
          />
        )}
      </button>
    </form>
  );
}

export { isPostcodeValid };
export default PostcodeSelector;
