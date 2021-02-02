import React from 'react';
import Carousel from './pictures/Carousel.jsx';
import Primary from './pictures/Primary.jsx';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 22px;
  display: grid;
  position: relative;
  grid-template-columns: 1fr 10fr;
  height: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  grid-column-start: 1;
  grid-column-end: 2;
`;

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: this.props.photos,
      highlight: 0
    };

  }


  render() {
    return (
      <Container>
        <CarouselContainer>
          <Carousel primary={this.state.primary} carousel={this.state.carousel} swapPhoto={this.props.swapPhoto} highlight={this.props.highlight}/>
        </CarouselContainer>
        <Primary primary={this.props.primary} toggleZoomIn={this.props.toggleZoomIn} toggleZoomOut={this.props.toggleZoomOut}/>
      </Container>
    );
  }
}

export default Photos;