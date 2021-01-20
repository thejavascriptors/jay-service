import React from 'react';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {


    return (
      <img id="primary" src={this.props.primary.url} alt={this.props.primary.description}></img>
    );
  }
}

export default Primary;