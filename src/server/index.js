const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
let faker = require('faker');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'sdc',
  host: 'localhost',
  port: 5432
});

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Queries should execute in less than 50ms
// Reach 1k rps on machine / 100 on ec2
// API response time less than 2000ms
// Max error rate 1%
// Stress test Httperf, Jmeter, Artillery,

app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  // Ask about inner joins vs double inner joins vs regular queries for creating structure
  // let multiQuery = `SELECT * FROM products INNER JOIN features USING(product_id) INNER JOIN images USING(product_id) WHERE products.product_id = '${id}'`;
  // pool.query(multiQuery, (err, response) => {
  //   console.log('Querying...');
  //   err ? res.send(err) : res.send(response);
  // });

  let product;
  // Single query
  let productQuery = `SELECT * FROM products WHERE product_id = '${id}'`;
  let featureQuery = `SELECT * FROM features WHERE product_id = '${id}'`;
  let imageQuery = `SELECT * FROM images WHERE product_id = '${id}'`;
  pool.query(productQuery, (err, pResRows) => {
    if (err) { return res.send(err); }
    let pRes = pResRows.rows[0];
    console.log(pRes);
    product = {
      name: pRes.title,
      brand: pRes.brand,
      stars: pRes.stars,
      ratings: pRes.ratings,
      shorthand: pRes.shorthand,
      price: pRes.price,
      stock: pRes.stock,
      shipping: { date: pRes.shipdate, supplier: pRes.shipsupplier },
      description: 'pRes.descriptions' // Need to add
    };
    pool.query(featureQuery, (err, fRes) => {
      if (err) { return res.send(err); }
      let featureRows = fRes.rows;
      product.features = [];
      for (let featureObj of featureRows) {
        product.features.push(featureObj.feature);
      }
      pool.query(imageQuery, (err, iRes) => {
        if (err) { return res.send(err); }
        let imageRows = iRes.rows;
        product.photos = [];
        for (let imageObj of imageRows) {
          let photo = {};
          photo.url = imageObj.imageurl;
          photo.description = imageObj.descriptions;
          product.photos.push(photo);
        }
        res.send(product);
      });
    });
  });
});

/*
  let dataTemplate = {
    name: '',
    brand: '',
    stars: '',
    ratings: '',
    shorthand: '',
    price: '',
    stock: '',
    shipping: { date: '', supplier: '' },
    features: [ '', '', '' ],
    description: '',
    photos: [
      { url: '', description: '' },
      { url: '', description: '' },
      { url: '', description: '' }
    ]
  };
});
*/

const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port', PORT));