import React from 'react';
import styled from 'styled-components';

class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.photo
    };
  }




  render() {

    return (
      // sets background image. changes background positioning as mouse moves
      <div id="zoom-container" style={{backgroundImage: 'url(' + this.props.photo.url + ')', backgroundPosition: (-this.props.x * 1.5) + 'px ' + (-this.props.y * 1.5) + 'px'}} >

      </div>
    );
  }
}


export default Zoom;