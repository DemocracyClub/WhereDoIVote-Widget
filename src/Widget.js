import React, { Component } from 'react';
import * as axios from 'axios';
import ResultsCard from './ResultsCard.js'

class Widget extends Component {
    constructor(props) {
        super(props);
        this.findStation = this.findStation.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state = {};
    }

    handleInput(event) {
      this.setState({ postcode: event.target.value})
    }

    updateState(output) {
        this.setState({resolvedPollingStation:
            {
                address: output.data.polling_station.properties.address,
                coordinates: output.data.polling_station.geometry.coordinates[1] + "," + output.data.polling_station.geometry.coordinates[0]
            }
        });
    }

    componentWillMount() {
        const link = document.createElement("link");
        link.rel = 'stylesheet';
        link.href = 'https://widget.wheredoivote.co.uk/wdiv.css';
        link.type = 'text/css';

        document.head.appendChild(link);
    }

    findStation() {
        axios.get('https://wheredoivote.co.uk/api/beta/postcode/' + this.state.postcode + '.json')
          .then(this.updateState)
    }

    render() {
        if (this.state.resolvedPollingStation) {
            return ( <ResultsCard pollingStation={this.state.resolvedPollingStation} /> );
        } else {
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
        }
    }
}

export default Widget;
