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
  padding-left: 3.5%;
  float: left;
  vertical-align: middle;
  height: 100%;
  max-height: 700px !important;
  overflow: visible;
  `;

const Image = styled.img`
  width: 100% !important;
  height: auto !important;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
  object-fit: contain;
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
        <Image id="primary" src={this.props.primary.url} alt={this.props.primary.description} onMouseMove={this.props.toggleZoomIn} onMouseOut={this.props.toggleZoomOut} />
      </PrimContainer>

    );
  }
}

export default Primary;