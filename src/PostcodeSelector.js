import React from 'react';

class PostcodeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.findStation = this.findStation.bind(this);
        this.state = {};
    }

    handleInput(event) {
      this.setState({ postcode: event.target.value})
    }

    findStation() {
        this.props.findStation(this.state.postcode);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
          this.findStation();
        }
    }

    render() {
        return (
            <div className="democracy_club_embed">
                <div className="card">
                    <div>
                        <div className="form-group">
                            <label className="form-label-bold">Enter your postcode</label>
                            <input type="text" id="postcode" name="postcode" className="form-control" onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
                        </div>
                        { this.props.error &&
                            <span className="dc_error">{this.props.error}</span>
                        }

                        <button type="submit" onClick={this.findStation}>Find your polling station</button>
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

export default PostcodeSelector;