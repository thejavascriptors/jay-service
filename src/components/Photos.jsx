import React from 'react';
import Carousel from './Carousel.jsx';
import Primary from './Primary.jsx';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // primary: this.props.primary,
      carousel: this.props.photos
    };

    // this.swapPhoto = this.swapPhoto.bind(this);
  }

  // swapPhoto(e) {
  //   this.setState({
  //     primary: {
  //       url: e.target.src,
  //       description: e.target.alt
  //     }
  //   });
  // }


  render() {
    return (
      <div id="photo-container">
        <div id="carousel-container">
          <Carousel primary={this.state.primary} carousel={this.state.carousel} swapPhoto={this.props.swapPhoto}/>
        </div>
        <div id="primary-container">
          <Primary primary={this.props.primary} toggleZoom={this.props.toggleZoom}/>
        </div>
      </div>
    );
  }
}

export default Photos;