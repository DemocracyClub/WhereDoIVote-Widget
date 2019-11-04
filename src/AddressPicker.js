import React from 'react';
import { injectIntl } from 'react-intl';

class AddressPicker extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.setAddress = this.setAddress.bind(this);
    this.addressOption = this.addressOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }

  setAddress(event) {
    this.setState({ address: event.target.value });
  }

  addressOption(address, index) {
    return (
      <option key={index} value={address.url}>
        {address.address}
      </option>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.address !== '') {
      this.props.lookupChosenAddress(this.state.address);
    }
  }

  render() {
    const isButtonDisabled = this.state.address === undefined;
    const inputProps = { disabled: isButtonDisabled, 'aria-disabled': isButtonDisabled };
    const { formatMessage } = this.props.intl;
    return (
      <form className="AddressPicker" data-testid="address-selector">
        <div className="form-group">
          <h1>
            <label id="choose-address" className="form-label-bold" htmlFor="id_address">
              {formatMessage({ id: 'address.choose-address' })}
            </label>
          </h1>
          <select
            aria-labelledby="id_address"
            value={this.state.value}
            onChange={this.setAddress}
            data-testid="address-select"
            className="dc-select-multirow"
            id="id_address"
            name="address"
            size="5"
          >
            {this.props.addressList.map(this.addressOption)}
            <option key={this.props.addressList.length} value="not-in-list"></option>
          </select>
        </div>
        <button
          {...inputProps}
          type="submit"
          className="button dc-btn-primary"
          data-testid="address-button"
          onClick={this.handleSubmit}
        >
          {formatMessage({ id: 'station.find-station' })}Î{' '}
        </button>
      </form>
    );
  }
}

export default injectIntl(AddressPicker);
