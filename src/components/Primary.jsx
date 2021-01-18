import React from 'react';

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {


    return (
      <img src={this.props.primary.url} alt={this.props.primary.description} height="300" width="300"></img>
    );
  }
}

export default Primary;