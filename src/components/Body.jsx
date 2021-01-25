import React from 'react';
import styled from 'styled-components';

const UsedPrice = styled.span`
  color: rgb(177, 39, 4);
  `;

const PrimeCheck = styled.i`
  background-image: url("https://m.media-amazon.com/images/S/sash/G1$iOHJcvIbQQBl.png");
  background-position: -170px -137px;
  background-size: 512px 256px;
  background-repeat: no-repeat;
  height: 15px;
  width: 53px;
  display: inline-block;
`;

const PriceWrapper = styled.div`
  margin-bottom: 8px;
  `;

const ThankYou = styled.a`
  margin-bottom: 8px;
`;

const Stock = styled.div`
  font-size: 18px;
  font-family: "Amazon Ember", Arial, sans-serif;
  color: rgb(0, 118, 0);
`;

const Delivery = styled.div`
  padding-top: 10px;
  padding-bottom: 8px;

`;

const FeatureList = styled.ul`
  margin: 0 0 0 18px;
  padding: 0;
  margin-bottom: 16px !important;
`;

const Price = styled.span`
  font-size: 18px !important;
  line-height: 24px !important;
  color: rgb(177, 39, 4);
`;

const NewUsed = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
`;

const Report = styled.div`
  padding-bottom: 6px;
`;

const QBubble = styled.span`
  display: inline-block;
  background-image: url("https://fec-project-jay-jones.s3.amazonaws.com/qbubbles.png");
  background-size: 200%;
  position: relative;
  width: 13px;
  top: 1px;
  height: 11px;
  background-position 0 0;
  &:hover{
    background-position: -13px;
  }
`;

const OrderWithin = styled.span`
  color: #565959;
`;



const Body = (props) => {
  if (props.product.stock > 0) {
    var stock = <p id="stock">In Stock.</p>;
  } else {
    var stock = <p id="out-stock">Out of Stock</p>;
  }

  const price = props.product.price;
  const date = props.product.shipping.date.split(' ');
  let shortenedDate = date.slice(0, 3).join(' ');


  return (

    <div id="body">
      <PriceWrapper>
        Price:
        <Price>{props.product.price}</Price>
        &nbsp;
        <PrimeCheck />
        &nbsp;
        &amp;
        <a href=""> FREE Returns</a>
      </PriceWrapper>
      <ThankYou href="">Thank you for being a Prime member. Get $70 off instantly: Pay $0.00 upon approval for the Congo Prime Rewards Visa Card. No annual fee.</ThankYou>
      <Stock>In Stock.</Stock>
      <Delivery>FREE delivery:
        <b> {shortenedDate}</b>
        <br/>
        <OrderWithin>Order within 6 hours and 13 mins</OrderWithin>
      </Delivery>
      <div>Ships from and sold by {props.product.shipping.supplier}
        <FeatureList>
          {props.product.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </FeatureList>
      </div>
      <NewUsed>
        <a>
          <span>New &amp; Used (153) from <UsedPrice>$55.19</UsedPrice> </span>
        </a>
        <PrimeCheck></PrimeCheck>
      </NewUsed>
      <Report>
        <QBubble />
        &nbsp;
        <a>Report incorrect product information.</a>
      </Report>
      <hr />
    </div>
  );
};


export default Body;