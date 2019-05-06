import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: ''
    };
  }

  render() {
    return(
      <fieldset className="content">
        <div className="control">
        <input className="control__input" type="text" placeholder="Paste your URL." value={this.state.hash} onChange={this.updateHash()}/>
        <button className="control__button" type="submit" onClick={this.submit}>
        <span>Word it</span>
        </button>
        </div>
      </fieldset>
    );
  }

  submit = () => {
    console.log('submit', this.state.hash);

  }

  updateHash = () => (event) => {
    this.setState({
      hash: event.target.value
    });
  }
}

