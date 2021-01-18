import React from 'react';
import Carousel from './Carousel.jsx';
import Primary from './Primary.jsx';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: this.props.photos[0],
      carousel: this.props.photos
    };
  }


  render() {
    return (
      <div>
        <div id="carousel-container">
          <Carousel primary={this.state.primary} carousel={this.state.carousel}/>
        </div>
        <div id="primary-container">
          <Primary primary={this.state.primary}/>
        </div>
      </div>
    );
  }
}

export default Photos;