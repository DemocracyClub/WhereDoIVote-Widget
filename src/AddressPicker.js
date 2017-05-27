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
        console.log(event.target.value);
        this.setState({ address: event.target.value });
    }

    addressOption(address) {
        return <option value={address.url}>{address.address}</option>;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSelection(this.state.address);
    }

    render() {
        return (
            <div className="democracy_club_embed">
                <div className="card">
                    <div>
                        <div className="form-group">
                            <label className="form-label-bold">Enter your postcode</label>
                            <select value={this.state.value} onChange={this.setAddress} aria-describedby="address_picker" className="select_multirow" id="id_address" name="address" size="10">
                            {

                                this.props.addressList.map(this.addressOption)
                            }
                            </select>
                        </div>
                        ​
                        <button type="submit" className="button" onClick={this.handleSubmit}>
                            I've selected my address. Find my Polling Station
                        </button>
                        <br/>
                    </div>
                    ​
                    <a href="https://democracyclub.org.uk/" className="dc_logo">
                        Built by <img alt="Democracy Club" src="https://candidates.democracyclub.org.uk/static/img/logo-with-text.png"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default AddressPicker;