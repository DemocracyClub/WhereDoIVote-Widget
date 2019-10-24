import React from 'react';

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
    const inputProps = { disabled: this.state.address === undefined };
    return (
      <form className="AddressPicker" data-testid="address-selector">
        <label className="form-label-bold">Choose your address</label>
        <select
          value={this.state.value}
          onChange={this.setAddress}
          data-testid="address-select"
          aria-describedby="address_picker"
          className="dc-select-multirow"
          id="id_address"
          name="address"
          size="5"
        >
          {this.props.addressList.map(this.addressOption)}
          <option key={this.props.addressList.length} value="not-in-list">
            My address is not in the list
          </option>
        </select>

        <button
          {...inputProps}
          type="submit"
          className="button dc-btn-primary"
          data-testid="address-button"
          onClick={this.handleSubmit}
        >
          Find my Polling Station
        </button>
      </form>
    );
  }
}

export default AddressPicker;
