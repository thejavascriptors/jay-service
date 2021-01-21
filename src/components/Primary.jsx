import React from 'react';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    console.log('primary props', this.props);

    return (
      <img id="primary" src={this.props.primary.url} alt={this.props.primary.description} onMouseEnter={this.props.toggleZoom} onMouseLeave={this.props.toggleZoom}></img>

    );
  }
}

export default Primary;