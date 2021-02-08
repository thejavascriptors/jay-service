require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
let faker = require('faker');
const mongoose = require('mongoose');
const Product = require('./mongoDB');
const secret = require('./secret');
const { Pool, Client } = require('pg');

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../dist')));

// Mongo
let mongoAtlas = secret.mongoURI;
let mongoLocal = 'mongodb://127.0.0.1:27017/sdclocal';
mongoose.connect(mongoAtlas, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('---------- Mongo Connected ----------'); });

// PostgreSQL
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'sdc',
  host: 'localhost',
  port: 5432
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../../dist/index.html'));
  // res.send('LOADED');
});


// // // MongoDB
app.get('/products/:id', (req, res) => {
  let id = req.params.id;
  var filter = {};
  filter['_id'] = id;
  // console.log(filter);

  Product.find(filter)
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => { res.status(404).send(err); });
});


// // // PostgreSQL
// app.get('/products/:id', (req, res) => {
//   let id = req.params.id;
//   let productQuery = `SELECT * FROM products WHERE product_id = '${id}'`;
//   let featureQuery = `SELECT * FROM features WHERE product_id = '${id}'`;
//   let imageQuery = `SELECT * FROM images WHERE product_id = '${id}'`;
//   pool.query(productQuery, (err, pResRows) => {
//     if (err) { return res.status(404).send(err); }
//     let pRes = pResRows.rows[0];
//     product = {
//       name: pRes.title,
//       brand: pRes.brand,
//       stars: pRes.stars,
//       ratings: pRes.ratings,
//       shorthand: pRes.shorthand,
//       price: pRes.price,
//       stock: pRes.stock,
//       shipping: { date: pRes.shipdate, supplier: pRes.shipsupplier },
//       description: 'pRes.descriptions' // Need to add to schema / seeding func
//     };
//     pool.query(featureQuery, (err, fRes) => {
//       if (err) { return res.status(404).send(err); }
//       let featureRows = fRes.rows;
//       product.features = [];
//       for (let featureObj of featureRows) {
//         product.features.push(featureObj.feature);
//       }
//       pool.query(imageQuery, (err, iRes) => {
//         if (err) { return res.status(404).send(err); }
//         let imageRows = iRes.rows;
//         product.photos = [];
//         for (let imageObj of imageRows) {
//           let photo = {};
//           photo.url = imageObj.imageurl;
//           photo.description = imageObj.descriptions;
//           product.photos.push(photo);
//         }
//         res.status(200).send(product);
//       });
//     });
//   });
// });


// /usr/local/Cellar/nginx/1.19.5/bin/nginx
// /usr/local/etc/nginx/nginx.conf
// /usr/local/var/log/nginx
// /usr/local/var/run/nginx
// /usr/local/var/run/
// /usr/local/Cellar/nginx
// READ DOCS
// ./configure --sbin-path=/usr/local/Cellar/nginx/1.19.5/bin/nginx --conf-path=/usr/local/etc/nginx/nginx.conf --error-log-path=/usr/local/var/log/nginx/error.log --http-log-path=/usr/local/var/log/nginx/access.log --with-pcre --pid-path=/usr/local/var/run/nginx.pid --with-http_ssl_module


const PORT = 8081;
app.listen(PORT, () => console.log('Server is running on port', PORT));