import React from 'react';
import {isValidUrl} from "./validateUrl";
import {Constants} from "./Constants";
import axios from 'axios'

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

  submit = async (event) => {
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

    const response = await axios.post(Constants.shortenLink, {url: this.state.hash}, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });

    return response.data;
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

