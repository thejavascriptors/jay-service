import React from 'react';
import styled from 'styled-components';

const Lens = styled.div`
  position: absolute;
  background-color: red;
  cursor: pointer;
  z-index: 1;
  visibility: visible;
  object-fit: fill;
  `;
// background-image: ${url("https://images-na.ssl-images-amazon.com/images/G/01/apparel/rcxgs/tile._CB483369110_.gif/")};

const PrimContainer = styled.div`
  background-color: grey;
  `;

// background-image: url("https://images-na.ssl-images-amazon.com/images/G/01/apparel/rcxgs/tile._CB483369110_.gif);
class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {

    return (
      <PrimContainer>
        <Lens></Lens>
        <img id="primary" src={this.props.primary.url} alt={this.props.primary.description} onMouseMove={this.props.toggleZoomIn} onMouseOut={this.props.toggleZoomOut}></img>
      </PrimContainer>

    );
  }
}

export default Primary;