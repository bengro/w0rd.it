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
        <footer>A pet project.</footer>
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
