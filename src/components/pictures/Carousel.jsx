import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  object-fit: contain;
  border: 1px solid grey;
  border-radius: 2px;
  width: 38px;
  height: 50px;

`;

const ThumbnailContainer = styled.div`
  border-color: #e77600;

`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: this.props.primary,
      highlight: this.props.highlight
    };
  }

  render() {

    let view = this.props.carousel.map((image, i) => {
      if (i === this.props.highlight) {
        return (
          <ThumbnailContainer key={`photo-container-${i}`} id={`photo-container-${i}`} >
            <Thumbnail src={image.url} alt={image.description} key={i} id={i} onMouseOver={this.props.swapPhoto} style={{ borderColor: '#e77600'}}></Thumbnail>
          </ThumbnailContainer>
        );
      } else {
        return (
          <ThumbnailContainer key={`photo-container-${i}`} id={`photo-container-${i}`} >
            <Thumbnail src={image.url} alt={image.description} key={i} onMouseOver={this.props.swapPhoto} id={i}></Thumbnail>
          </ThumbnailContainer>
        );
      }
    }
    );
    console.log('view:', view);

    return (
      <div id="photo-carousel">
        {view}
      </div>
    );


  }
}

export default Carousel;
