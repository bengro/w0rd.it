import React from 'react';
import {isValidUrl} from "./validateUrl";
import {Constants} from "./Constants";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      hasFired: false,
      hasError: false
    };
  }

  render() {
    return (
      <fieldset className="content">
        <form className="control">
          {this.state.hasError &&
          <p className={'warning'}><span aria-label={"Poo emoji"} role="img">💩</span>Not a URL</p>}
          <input className="control__input" type="text" placeholder="Paste your URL." value={this.state.hash}
                 onChange={this.updateHash()}/>
          <button className="control__button" type="submit" onClick={this.submit} disabled={this.state.hasFired}>
            <span>Shorten</span>
          </button>
        </form>
      </fieldset>
    );
  }

  submit = (event) => {
    event.preventDefault();

    if (!isValidUrl(this.state.hash)) {
      this.setState({
        hasError: true
      });
      return;
    }

    this.setState({
      hasFired: true
    });

    fetch(Constants.shortenLink, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url: this.state.hash})
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (shortenedHash) {
        console.log(shortenedHash);
      })
  };

  updateHash = () => (event) => {
    this.setState({
      hash: event.target.value
    });

    if (this.state.hasFired) {
      if (!isValidUrl(event.target.value)) {
        this.setState({
          hasError: true
        });
      } else {
        this.setState({
          hasError: false
        });
      }
    }
  }
}

