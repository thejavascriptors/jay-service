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

// start multi instaces:
// pm2 start --name server1 src/server/index.js -- --name server1 --port 3000
// pm2 start --name server2 src/server/index.js -- --name server2 --port 3001
// pm2 start --name server3 src/server/index.js -- --name server3 --port 3002
// pm2 start --name server4 src/server/index.js -- --name server4 --port 3003
// change port CONST when creating instance
const PORT = 3000;


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
app.get('/products', (req, res) => {
// let id = req.params.id;
  let id = '60209c02e15e96e1dc33c32b';
  var filter = {};
  filter['_id'] = id;
  // console.log(filter);

  Product.find(filter)
    .then((data) => {
      // console.log(data);
      data[0].server = `-- PORT: ${PORT}`;
      res.status(200).send(data);
    })
    .catch((err) => { res.status(404).send(err); });
});


// // // PostgreSQL
// app.get('/products', (req, res) => {
//   // let id = req.params.id;
//   let id = 'v4o2u9mtpnhl';
//   let productQuery = `SELECT * FROM products WHERE product_id = '${id}'`;
//   let featureQuery = `SELECT * FROM features WHERE product_id = '${id}'`;
//   let imageQuery = `SELECT * FROM images WHERE product_id = '${id}'`;
//   pool.query(productQuery, (err, pResRows) => {
//     if (err) { return res.status(404).send(err); }
//     let pRes = pResRows.rows[0];
//     product = {
//       port: `-- PORT: ${PORT}`,
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


app.listen(PORT, () => console.log('Server is running on port', PORT));