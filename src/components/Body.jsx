import React from 'react';

const Body = (props) => {
  console.log('body props', props);
  if (props.product.stock > 0) {
    var stock = <p id="stock">In Stock</p>;
  } else {
    var stock = <p id="out-stock">Out of Stock</p>;
  }


  return (

    <div id="body">
      <p>Price: {props.product.price} Primebtn and <a href=""> FREE Returns</a> </p>
      <a href="">Thank you for being a Prime member. Get $70 off instantly: Pay $0.00 upon approval for the Congo Prime Rewards Visa Card</a>
      {stock}
      <p>Free delivery: {props.product.shipping.date}</p>
      <p>Ships from and sold by {props.product.shipping.supplier}</p>
      <ul>
        {props.product.features.map((feature) => (
          <li>{feature}</li>
        ))}
      </ul>
    </div>
  );
};


export default Body;