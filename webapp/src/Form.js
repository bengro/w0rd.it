import React from 'react';
import {isValidUrl} from "./validateUrl";
import {Constants} from "./Constants";
import axios from 'axios'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      hasFired: false,
      hasError: false,
      hasReturned: false
    };
  }

  render() {
    return (
      <fieldset className="content">
        {!this.state.hasReturned && <form className="control">
          {this.state.hasError &&
          <p className={'warning'}><span aria-label={"Poo emoji"} role="img">💩</span>Not a URL</p>}
          <input className="control__input" type="text" placeholder="Paste your URL." value={this.state.url}
                 onChange={this.updateHash()}/>
          <button className="control__button" type="submit" onClick={this.submit}>
            <span>Shorten</span>
          </button>
        </form>}
        {this.state.hasReturned && <div>
          <input id="url" className="control__output" type="text" value={this.state.url}/>
        </div>}
      </fieldset>
    );
  }

  submit = async (event) => {
    event.preventDefault();

    if (!isValidUrl(this.state.url)) {
      this.setState({
        hasError: true
      });
      return;
    }

    this.setState({
      hasFired: true
    });

    const response = await axios.post(Constants.shortenLink, {url: this.state.url}, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });

    this.setState({
      ...this.state,
      hasReturned: true
    });

    this.props.onSuccessfulSubmit(response.data);
  };

  updateHash = () => (event) => {
    this.setState({
      url: event.target.value
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

