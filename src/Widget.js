import React, { Component } from 'react';
import ResultsCard from './ResultsCard.js';
import AddressPicker from './AddressPicker.js';
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

    findStation() {
        getPollingStation(this.state.postcode).then(this.updateState)
    }

    render() {
        if (!this.state.searchInitiated) {
            return (
                 <div className="democracy_club_embed">
                     <div className="card">
                             <div className="form-group">
                                 <label for="postcode" className="form-label-bold">Enter your postcode</label>
                                 <input type="text" id="postcode" name="postcode" className="form-control" onChange={this.handleInput}/>
                                 <p className="form-hint">e.g. GL1 2EQ</p>
                             </div>
                             <button type="submit" onClick={this.findStation}>Find your polling station</button>
                         ​
                         <a href="https://democracyclub.org.uk/" className="dc_logo">
                             Built by <img alt="Democracy Club" src="https://candidates.democracyclub.org.uk/static/img/logo-with-text.png"/>
                         </a>
                     </div>
                 </div>
               );
        } else if (this.state.foundStation) {
            return ( <ResultsCard pollingStation={this.state.resolvedPollingStation} /> );
        } else if (!this.state.foundStation && this.state.addressList) {
            return ( <AddressPicker onSelection={this.handleAddressSelectorState} addressList={this.state.addressList} />)
        }
    }
}

export default Widget;
