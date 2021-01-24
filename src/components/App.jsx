import React from 'react';
import axios from 'axios';
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

var sampleData = {
  name: 'DualSense Wireless Controller',
  brand: 'PlayStation',
  platform: 'PlayStation 5',
  stars: 4.97,
  ratings: 8391,
  shorthand: 'ps5 controller',
  price: '$69.98',
  stock: 10231,
  shipping: {
    date: 'Mon, Jan 18',
    supplier: 'Congo.com'
  },
  features: ['Haptic feedback** - Feel physically responsive feedback to your in-game actions with dual actuators which replace traditional rumble motors. In your hands, these dynamic vibrations can simulate the feeling of everything from environments to the recoil of different weapons.', 'Adaptive triggers** - Experience varying levels of force and tension as you interact with your in-game gear and environments. From pulling back an increasingly tight bowstring to hitting the brakes on a speeding car, feel physically connected to your on-screen actions.', 'Built-in microphone and headset jack - Chat with friends online*** using the built-in microphone or by connecting a headset to the 3.5mm jack. Easily switch voice capture on and off at a moment’s notice with the dedicated mute button. ***Internet and account for PlayStation Network required.'],
  photos: [
    {
      url: 'https://fec-project-jay-jones.s3.amazonaws.com/controllerfront.jpg',
      description: 'playstation 5 controller front profile'
    },
    {
      url: 'https://fec-project-jay-jones.s3.amazonaws.com/boxfront.jpg',
      description: 'playstation 5 controller box front'
    },
    {
      url: 'https://fec-project-jay-jones.s3.amazonaws.com/boxangle.jpg',
      description: 'playstation 5 controller box from angle'
    }
  ]
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: sampleData,
      zoom: false,
      primary: sampleData.photos[0],
      zoomX: null,
      zoomY: null,
    };
    this.toggleZoomIn = this.toggleZoomIn.bind(this);
    this.swapPhoto = this.swapPhoto.bind(this);
    this.toggleZoomOut = this.toggleZoomOut.bind(this);

  }

  // componentDidMount() {
  //   axios(`localhost:4242/products/${this.state.productId}`)
  //     .then(product => {
  //       this.setState({
  //         data: product
  //       })
  //    });

  swapPhoto(e) {
    this.setState({
      primary: {
        url: e.target.src,
        description: e.target.alt
      }
      // highlight: e.target.
    });
  }

  toggleZoomIn(event) {
    console.log('event:', event);
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    console.log('x:', x, 'y:', y);

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

    if (this.state.zoom === false) {
      console.log('zoom', this.state.zoom);
      return (
        <div className="grid-container">
          <GlobalStyle />
          <div className="grid-item" id="grid-1">
            <Photos photos={this.state.data.photos} primary={this.state.primary} swapPhoto={this.swapPhoto} toggleZoomIn={this.toggleZoomIn}
              toggleZoomOut={this.toggleZoomOut}/>
          </div>
          <div className="grid-item" id="grid-2">
            <Description product={this.state.data}/>
            {/* <Body product={this.state.data} /> */}
          </div>
        </div>
      );
    }


    if (this.state.zoom === true) {
      console.log('switching to zoom render');
      return (
        <div className="grid-container">
          <GlobalStyle />
          <div className="grid-item" id="grid-1">
            <Photos photos={this.state.data.photos} primary={this.state.primary} swapPhoto={this.swapPhoto} toggleZoomIn={this.toggleZoomIn}
              toggleZoomOut={this.toggleZoomOut}/>
          </div>
          <div className="grid-item" id="grid-2">
            <Zoom photo={this.state.primary} x={this.state.zoomX} y={this.state.zoomY}/>
            <Description product={this.state.data}/>
            {/* <Body product={this.state.data} /> */}
          </div>
        </div>
      );
    }
  }
}



export default App;