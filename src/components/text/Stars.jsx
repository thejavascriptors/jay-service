import React from 'react';
import styled from 'styled-components';

const StarIcon = styled.div`
  background-image: url("https://m.media-amazon.com/images/S/sash/3-fm1Jbg4IHlyhq.png");
  background-size: 512px 256px;
  background-repeat: no-repeat;
  display: inline-block;
  height: 16px;
  width: 80px;


`;


class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: Math.round(this.props.stars)
    };
  }





  render() {
    var rounded = Math.round(this.props.stars * 2) / 2;
    if (rounded === 5) {
      var position = {
        backgroundPosition: '-166px -35px'
      };
    }

    return (
      <StarIcon style={position} />

    );
  }
}


export default Stars;