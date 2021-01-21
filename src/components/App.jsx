import React from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Zoom from './Zoom.jsx';

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
      primary: sampleData.photos[0]
    };
    this.toggleZoom = this.toggleZoom.bind(this);
    this.swapPhoto = this.swapPhoto.bind(this);

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
    });
  }

  toggleZoom() {
    console.log('toggling zoom');
    this.setState({
      zoom: !this.state.zoom
    });
    console.log('state set', this.state.zoom);
  }


  render() {

    if (this.state.zoom === false) {
      console.log('zoom', this.state.zoom);
      return (
        <div className="grid-container">
          <div className="grid-item" id="grid-1">
            <Photos photos={this.state.data.photos} primary={this.state.primary} swapPhoto={this.swapPhoto} toggleZoom={this.toggleZoom}/>
          </div>
          <div className="grid-item" id="grid-2">
            <Header product={this.state.data}/>
          </div>
          <div className="grid-item" id="grid-3">
            <Body product={this.state.data} />
          </div>
        </div>
      );
    }


    if (this.state.zoom === true) {
      console.log('switching to zoom render');
      return (
        <div className="grid-container">
          <div className="grid-item" id="grid-1">
            <Photos photos={this.state.data.photos} primary={this.state.primary} swapPhoto={this.swapPhoto} toggleZoom={this.toggleZoom}/>
          </div>
          <div id="zoom-container">
            <Zoom photo={this.state.primary}/>
          </div>
          <div className="grid-item" id="grid-2">
            <Header product={this.state.data}/>
          </div>
          <div className="grid-item" id="grid-3">
            <Body product={this.state.data} />
          </div>
        </div>
      );
    }
  }
}



export default App;