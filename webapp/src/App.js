import React from 'react';
import './App.css';
import Form from './Form';
import Header from './Header';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      shortenedUrl: {}
    };
  }

  render() {
    return (
      <div id="wordItForm">
        <Header shortenedUrl={this.state.shortenedUrl}/>
        <Form onSuccessfulSubmit={this.renderUpdate}/>
        <footer>
          Code on <a href="https://github.com/bengro/w0rd.it" target="_blank" rel="noopener noreferrer">Github</a> |
          Inspired by <a href="https://what3words.com/" target="_blank" rel="noopener noreferrer">what3words</a>
        </footer>
      </div>
    );
  }

  renderUpdate = (payload) => {
    this.setState({
      shortenedUrl: payload
    })
  }
}

export default App;
