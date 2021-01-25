import React from 'react';
import Axios from 'axios';
import Photos from './Photos.jsx';
import Description from './Description.jsx';
import Body from './Body.jsx';
import Zoom from './Zoom.jsx';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    color: #007185;
    text-decoration: none;
  }
  a:hover {
    color: #C7511F;
    cursor: pointer;
    text-decoration: underline;
  }

  body{
    font-family: "Amazon Ember", Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
  }

  hr{
    color: rgb(128, 128, 128);
    background-color: trasnparent;
    display: block;
    height: 1px;
    border-width: 0;
    border-top: 1px solid #e7e7e7;
    line-height: 19px;
    margin-top: 0;
    margin-bottom: 14px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 100%;
`;

const Grid1 = styled.div`
  grid-row-start: 1;
  grid-column: 1 / 2;
  grid-template-columns: 1fr 4fr;
  height: 100%;
`;

const Grid2 = styled.div`
  grid-column: 2 / 3;
  height: 100%;
  position: relative;
  z-index: 0;
  margin-left: 18px;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      zoom: false,
      primary: {},
      zoomX: null,
      zoomY: null,
      view: 'loading'
    };
    this.toggleZoomIn = this.toggleZoomIn.bind(this);
    this.swapPhoto = this.swapPhoto.bind(this);
    this.toggleZoomOut = this.toggleZoomOut.bind(this);

  }

  componentDidMount() {
    Axios('http://localhost:4242/products/')
      .then(product => {
        let currProduct = product.data[0];
        this.setState({
          data: currProduct,
          primary: currProduct.photos[0],
          view: 'standard'
        });
      });
  }

  swapPhoto(e) {
    this.setState({
      primary: {
        url: e.target.src,
        description: e.target.alt
      }
    });
  }

  toggleZoomIn(event) {
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;

    this.setState({
      zoom: true,
      zoomX: x,
      zoomY: y,

    });
  }

  toggleZoomOut(event) {
    this.setState({
      zoom: false
    });
  }


  render() {

    if (this.state.view === 'loading') {
      return (
        <div>
        </div>
      );
    }

    if (this.state.zoom === false && this.state.view === 'standard') {
      return (
        <Container>
          <GlobalStyle />
          <Grid1>
            <Photos photos={this.state.data.photos} primary={this.state.primary} swapPhoto={this.swapPhoto} toggleZoomIn={this.toggleZoomIn}
              toggleZoomOut={this.toggleZoomOut}/>
          </Grid1>
          <Grid2>
            <Description product={this.state.data}/>
          </Grid2>
        </Container>
      );
    }


    if (this.state.zoom === true && this.state.view === 'standard') {
      return (
        <Container>
          <GlobalStyle />
          <Grid1>
            <Photos photos={this.state.data.photos} primary={this.state.primary} swapPhoto={this.swapPhoto} toggleZoomIn={this.toggleZoomIn}
              toggleZoomOut={this.toggleZoomOut}/>
          </Grid1>
          <Grid2>
            <Description product={this.state.data}/>
            <Zoom photo={this.state.primary} x={this.state.zoomX} y={this.state.zoomY}/>
          </Grid2>
        </Container>
      );
    }
  }
}



export default App;