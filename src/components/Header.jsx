import React from 'react';

const Header = (props) => (
  <div id="product-header">
    <h1>{props.product.name}</h1>
    <a href="">Brand: {props.product.brand}</a>
    <div><b>Platform:</b> {props.product.platform} | Rated: <a href="">Rating Pending</a></div>
    <div>Stars: {props.product.stars} <a href=""> {props.product.ratings} ratings </a></div>
    <span>Congo's Choice for <a href="">"{props.product.shorthand}"</a></span>
    <div>_____________________________________________________________</div>
  </div>
);


export default Header;