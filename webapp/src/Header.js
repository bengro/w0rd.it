import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionActive: false
    };
  }

  render() {
    return (
      <header>
        {this.state.descriptionActive && <div className="bubble">
          <div className="bubble__triangle"></div>
          </div>}

        <div className="title">
          <span className="title__name">w0rd.it</span>
          <span className="title__slash">/</span>
          <span className="title__hash"></span>
        </div>

        <div className="primer">Get a memorable word for your bad-ass URL.</div>
      </header>
    )
  }
}
