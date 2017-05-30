import React, { Component } from 'react';
import ResultsCard from './ResultsCard.js';
import AddressPicker from './AddressPicker.js';
import PostcodeSelector from './PostcodeSelector.js';
import StationNotFound from './StationNotFound.js';
import { getPollingStation, toAddress, getFromSelector } from './WdivAPI.js';

class Widget extends Component {
    constructor(props) {
        super(props);
        this.findStation = this.findStation.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateErrorState = this.updateErrorState.bind(this);
        this.updateErrorFromResponse = this.updateErrorFromResponse.bind(this);
        this.handleAddressSelectorState = this.handleAddressSelectorState.bind(this);
        this.state = {};
    }

    handleInput(event) {
      this.setState({ postcode: event.target.value})
    }

    updateErrorState(error) {
        this.setState({ error: error.replace(/.*: /g, "") });
    }

    updateErrorFromResponse(data) {
        this.updateErrorState(data.response.data.detail)
    }

    updateState(output) {
        this.setState({ error: undefined })
        if (output.data.polling_station_known) {
            this.setState({ searchInitiated: true, foundStation: true, resolvedPollingStation: toAddress(output)});
        } else if (output.data.addresses.length === 0) {
            this.setState({ searchInitiated: true, foundStation: false, council: output.data.council })
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
        if (postcode === undefined || postcode.replace(/\W/g,"").length === 0) {
           this.updateErrorState('Postcode is empty, please enter a non-empty postcode.')
        } else {
            getPollingStation(postcode)
                .then(this.updateState)
                .catch(this.updateErrorFromResponse);
        }
    }

    render() {
        if (!this.state.searchInitiated) {
            return ( <PostcodeSelector findStation={this.findStation} error={this.state.error}/> );
        } else if (this.state.foundStation) {
            return ( <ResultsCard pollingStation={this.state.resolvedPollingStation} /> );
        } else if (!this.state.foundStation && this.state.addressList) {
            return ( <AddressPicker onSelection={this.handleAddressSelectorState} addressList={this.state.addressList} /> );
        } else {
            return ( <StationNotFound council={this.state.council} /> );
        }
    }
}

export default Widget;
