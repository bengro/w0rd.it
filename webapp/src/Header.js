import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        {this.props.shortenedUrl.description && <div className="bubble">
          {this.props.shortenedUrl.description}
          <div className="bubble__triangle"></div>
        </div>}

        <div className="title">
          <span className="title__name">w0rd.it</span>
          <span className="title__slash">/</span>
          <span className="title__hash">{this.props.shortenedUrl.hash}</span>
        </div>

        <div className="primer">Get a memorable word for your bad-ass URL.</div>
      </header>
    )
  }
}

Header.defaultProps = {
  shortenedUrl: {},
};
