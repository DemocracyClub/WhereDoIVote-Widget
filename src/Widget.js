import React, { Component } from 'react';
import ResultsCard from './ResultsCard.js';
import AddressPicker from './AddressPicker.js';
import PostcodeSelector from './PostcodeSelector.js';
import StationNotFound from './StationNotFound.js';
import * as axios from 'axios';
import API from './WdivAPI.js';
require('es6-shim');

class Widget extends Component {
    constructor(props) {
        super(props);
        this.findStation = this.findStation.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateErrorState = this.updateErrorState.bind(this);
        this.updateErrorFromResponse = this.updateErrorFromResponse.bind(this);
        this.handleAddressSelectorState = this.handleAddressSelectorState.bind(this);
        this.home = this.home.bind(this);
        this.api = new API(axios);
        this.state = {};
    }

    handleInput(event) {
        this.setState({ postcode: event.target.value});
    }

    updateErrorState(error) {
        this.setState({ error: error });
    }

    updateErrorFromResponse(data) {
        var err = data.response.data.detail.replace(/.*: /g, "");
        if (data.response.status === 400) {
            if (err.startsWith('Postcode') && err.endsWith('is not valid.')) {
                this.updateErrorState(err);
            } else {
                this.updateErrorState("We don't know where you should vote");
            }
        } else {
            this.updateErrorState("We don't know where you should vote");
        }
    }

    updateState(output) {
        this.setState({ error: undefined })

        if (output.data.polling_station_known) {
            this.setState({
              searchInitiated: true,
              foundStation: true,
              resolvedPollingStation: this.api.toAddress(output),
              metadata: output.data.metadata
            });
        } else if (output.data.council === null) {
            this.updateErrorState("We don't know where you should vote");
        } else if (this.state.addressList !== undefined) {
            this.setState({
              searchInitiated: true,
              foundStation: false,
              council: output.data.council,
              addressList: undefined,
              metadata: output.data.metadata
            });
        } else if (output.data.addresses.length === 0) {
            this.setState({
              searchInitiated: true,
              foundStation: false,
              council: output.data.council,
              metadata: output.data.metadata
            });
        } else {
            this.setState({
              searchInitiated: true,
              foundStation: false,
              council: output.data.council,
              addressList: output.data.addresses,
              metadata: output.data.metadata
            });
        }
    }

    handleAddressSelectorState(value) {
        if(value === "") {
            this.setState({ addressList: undefined });
        } else {
            this.api.getFromSelector(value).then(this.updateState);
        }

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
           this.updateErrorState('Postcode is empty, please enter a non-empty postcode.');
        } else {
            this.api.getPollingStation(postcode)
                .then(this.updateState)
                .catch(this.updateErrorFromResponse);
        }
    }

    home() {
        this.setState({
            searchInitiated: false,
            addressList: undefined,
            foundStation: undefined,
            resolvedPollingStation: undefined,
            council: undefined,
            metadata: undefined
        });
    }

    render() {
        if (!this.state.searchInitiated) {
            return ( <PostcodeSelector findStation={this.findStation} error={this.state.error}/> );
        } else if (this.state.foundStation) {
            return ( <ResultsCard
              pollingStation={this.state.resolvedPollingStation}
              home={this.home}
              metadata={this.state.metadata}
            /> );
        } else if (!this.state.foundStation && this.state.addressList) {
            return ( <AddressPicker home={this.home} onSelection={this.handleAddressSelectorState} addressList={this.state.addressList} /> );
        } else {
            return ( <StationNotFound
              council={this.state.council}
              home={this.home}
              metadata={this.state.metadata}
            /> );
        }
    }
}

export default Widget;
