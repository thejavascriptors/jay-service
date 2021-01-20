import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: this.props.primary
    };
  }

  render() {
    let view = this.props.carousel.map((image, i) =>
      <div key={`photo-container-${i}`} id={`photo-container-${i}`}>
        <img src={image.url} alt={image.description} key={i} width="100" height="100" className="photo-on-carousel" onMouseOver={this.props.swapPhoto}></img>
      </div>
    );
    console.log('view', view);

    return (
      <div id="photo-carousel">
        {view}
      </div>
    );


  }
}

export default Carousel;
