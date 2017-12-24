import React from 'react';
import { EmbedCard, BuiltByDC } from './Branding';

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
            <EmbedCard>
                    <div>
                        <div className="form-group">
                            <label className="form-label-bold">Enter your postcode</label>
                            <input type="text" id="postcode" name="postcode" className="form-control" onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
                        </div>
                        { this.props.error &&
                            <span id="dc_error" className="dc_error">{this.props.error}</span>
                        }

                        <button type="submit" onClick={this.findStation}>Find your polling station</button>
                    </div>

                    <BuiltByDC/>
            </EmbedCard>
        );
    }
}

export default PostcodeSelector;