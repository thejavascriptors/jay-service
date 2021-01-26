const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./db/Products.js');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../dist')));

const PORT = 4242;

app.get('/', (req, res) => {
  res.send(200);
});

app.get('/products/', (req, res) => {
  let id = req.params.id;
  Product.find({ name: 'DualSense Wireless Controller' })
    .then((data) => {
      res.send(data);
    });
});

app.listen(PORT, () => console.log('Server is running on port', PORT));