import React from 'react';
import styled from 'styled-components';

const ProductName = styled.h1`
  color: rgb(15, 17, 17);
  font-size: 24px;
  font-weight: 400;
  word-break: break-word;
  text-rendering: optomizelegibility;
  margin: 0;
  padding: 0;
  line-height: 32px;
`;

const CongoBGround = styled.span`
  background-color: #232F3E;
  display: flex;
  float: left;
  height: 22px;
  line-height: 16px;
  border-color: #232F3E;
`;

const CongoTriangle = styled.span`
  color: #232F3E;
  border-top: 22px solid;
  border-right: 10px solid transparent;
  width: 0;
  height: 0;
`;

const CongoChoice = styled.span`
  display: inline-flex;
  margin: 5px 0 10px;
`;

const Congos = styled.span`
  margin-left: 8px;
  margin-right: 3px;
  min-width: 36px;
  color: rgb(255, 255, 255);
  box-sizing: border-box;
  line-height: 22px;
  font-size: 12px;
`;

const Choice = styled.span`
  margin-right: 8px;
  line-height: 22px;
  color: #F69931;
  min-width: 24px;
  box-sizing: border-box;
  font-size: 12px;
`;

const CCText = styled.span`
  display: inline;
  margin-left: 5px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
`;

const Shorthand = styled.a`
  font-size: 12px;
`;

const Break = styled.hr`
  color: rgb(128, 128, 128);
  background-color: trasnparent;
  display: block;
  height: 1px;
  border-width: 0;
  border-top: 1px solid #e7e7e7;
  line-height: 19px;
  margin-top: 0;
  margin-bottom: 14px;
`;

const Reviews = styled.div`
  display: inline-block;
`;

const Header = (props) => (
  <div id="product-header">
    <ProductName>{props.product.name}</ProductName>
    <a href="">Brand: {props.product.brand}</a>
    <div><b>Platform:</b> {props.product.platform} | Rated: <a href="">Rating Pending</a></div>
    <Reviews>
      Stars: {props.product.stars}
      <a href=""> {props.product.ratings} ratings </a>
    </Reviews>
    <div>
      <CongoChoice>
        <CongoBGround>
          <Congos>Congo's</Congos>
          <Choice>Choice</Choice>
        </CongoBGround>
        <CongoTriangle />
        <CCText>
          for "
          <Shorthand>{props.product.shorthand}</Shorthand>
          "
        </CCText>
      </CongoChoice>
    </div>
    <Break></Break>
  </div>
);

export default Header;