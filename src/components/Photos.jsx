import React from 'react';

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
      <div id="photo-carousel">
        {this.state.carousel.map(image => (
          <img src={image.url} alt={image.description} width="200" height="200"></img>
        ))}
      </div>
    );
  }
}

export default Photos;