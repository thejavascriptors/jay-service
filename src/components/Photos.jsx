import React from 'react';
import Carousel from './Carousel.jsx';
import Primary from './Primary.jsx';
import styled from 'styled-components';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: this.props.photos
    };

  }


  render() {
    return (
      <div id="photo-container">
        <div id="carousel-container">
          <Carousel primary={this.state.primary} carousel={this.state.carousel} swapPhoto={this.props.swapPhoto}/>
        </div>
        <Primary primary={this.props.primary} toggleZoomIn={this.props.toggleZoomIn} toggleZoomOut={this.props.toggleZoomOut}/>
      </div>
    );
  }
}

export default Photos;