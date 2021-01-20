import React from 'react';

const Header = (props) => (
  <div id="product-header">
    <h1>{props.product.name}</h1>
    <a href="">Brand: {props.product.brand}</a>
    <p>Platform: {props.product.platform}</p>
    <p>Stars: {props.product.stars}  {props.product.ratings} ratings</p>
    <p>Congo's Choice for <a href="">"{props.product.shorthand}"</a></p>
  </div>
);


export default Header;