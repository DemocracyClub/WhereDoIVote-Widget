import React from 'react';
import styles from './WidgetStyles';

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
        return <option key={index} value={address.url}>{address.address}</option>;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSelection(this.state.address);
    }

    render() {
        const inputProps = { disabled: this.state.address === undefined }
        return (
            <div style={styles.DCEmbed}>
                <div style={styles.Card}>
                    <div>
                        <div styles={styles.FormGroup}>
                            <label className="form-label-bold">Choose your address</label>
                            <select value={this.state.value} onChange={this.setAddress} aria-describedby="address_picker" className="democracy_club_select_multirow" id="id_address" name="address" size="5">
                            {
                                this.props.addressList.map(this.addressOption)
                            }
                                <option key={this.props.addressList.length} value="">My address is not in the list</option>
                            </select>
                        </div>

                        <button {...inputProps} type="submit" className="button" onClick={this.handleSubmit}>
                            Find my Polling Station
                        </button>
                        <br/>
                         <button href="#" onClick={this.props.home}>Back to postcode search</button>
                    </div>

                    <div>
                        <a href="https://democracyclub.org.uk/" target="_top" className="dc_logo">
                        Built by <img alt="Democracy Club" src="https://widget.wheredoivote.co.uk/logo-with-text.png"/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressPicker;