import React from 'react';
import Body from './Description/Body.jsx';
import Header from './Description/Header.jsx';
import styled from 'styled-components';

const Container = styled.div`

  z-index: 0;
  position: relative;
`;


const Description = (props) => (
  <Container>
    <Header product={props.product} />
    <Body product={props.product}/>
  </Container>

);


export default Description;