import React from 'react';

class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.photo
    };
  }




  render() {
    console.log('rendering zoom');
    console.log('props', this.props);
    console.log('state', this.state.photo.url);

    return (
      <img id="zoom" src={this.state.photo.url} alt={this.state.photo.description}></img>
    );
  }
}

export default Zoom;