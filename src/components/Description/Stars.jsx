import React from 'react';
import styled from 'styled-components';

const FullStar = styled;


class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: Math.round(this.props.stars)
    };
  }





  render() {
    var filledIn = Math.round(this.props.stars);
    var empty = 5 - filledIn;

    var stars = [];

  }
}


