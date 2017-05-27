import React, { Component } from 'react';
import ResultsCard from './ResultsCard.js';
import AddressPicker from './AddressPicker.js';
import PostcodeSelector from './PostcodeSelector.js';
import { getPollingStation, toAddress, getFromSelector } from './WdivAPI.js';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.findStation = this.findStation.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleAddressSelectorState = this.handleAddressSelectorState.bind(this);
        this.state = {};
    }

    handleInput(event) {
      this.setState({ postcode: event.target.value})
    }

    updateState(output) {
        if (output.data.polling_station_known) {
            this.setState({ searchInitiated: true, foundStation: true, resolvedPollingStation: toAddress(output)});
        } else if (output.data.addresses.length === 0) {
            this.setState({ searchInitiated: true, foundStation: false })
        } else {
            this.setState({ searchInitiated: true, foundStation: false, addressList: output.data.addresses})
        }
    }

    handleAddressSelectorState(value) {
        getFromSelector(value).then(this.updateState);
    }

    componentWillMount() {
        const link = document.createElement("link");
        link.rel = 'stylesheet';
        link.href = 'https://widget.wheredoivote.co.uk/wdiv.css';
        link.type = 'text/css';

        document.head.appendChild(link);
    }

    findStation(postcode) {
        getPollingStation(postcode).then(this.updateState)
    }

    render() {
        if (!this.state.searchInitiated) {
            return ( <PostcodeSelector findStation={this.findStation} /> );
        } else if (this.state.foundStation) {
            return ( <ResultsCard pollingStation={this.state.resolvedPollingStation} /> );
        } else if (!this.state.foundStation && this.state.addressList) {
            return ( <AddressPicker onSelection={this.handleAddressSelectorState} addressList={this.state.addressList} /> );
        }
    }
}

export default Widget;
