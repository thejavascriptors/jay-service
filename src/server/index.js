require('newrelic');
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


app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  let productQuery = `SELECT * FROM products WHERE product_id = '${id}'`;
  let featureQuery = `SELECT * FROM features WHERE product_id = '${id}'`;
  let imageQuery = `SELECT * FROM images WHERE product_id = '${id}'`;
  pool.query(productQuery, (err, pResRows) => {
    if (err) { return res.send(err); }
    let pRes = pResRows.rows[0];
    product = {
      name: pRes.title,
      brand: pRes.brand,
      stars: pRes.stars,
      ratings: pRes.ratings,
      shorthand: pRes.shorthand,
      price: pRes.price,
      stock: pRes.stock,
      shipping: { date: pRes.shipdate, supplier: pRes.shipsupplier },
      description: 'pRes.descriptions' // Need to add to schema / seeding func
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


const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port', PORT));