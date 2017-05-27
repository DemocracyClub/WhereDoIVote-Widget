import React from 'react';

class PostcodeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.handleInput = this.handleInput.bind(this);
        this.findStation = this.findStation.bind(this);
        this.state = {};
    }

    handleInput(event) {
      this.setState({ postcode: event.target.value})
    }

    findStation() {
        this.props.findStation(this.state.postcode);
    }

    render() {
        return (
             <div className="democracy_club_embed">
                 <div className="card">
                         <div className="form-group">
                             <label className="form-label-bold">Enter your postcode</label>
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

export default PostcodeSelector;