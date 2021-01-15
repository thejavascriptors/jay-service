const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./db/Product.js');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));
const PORT = 4242;

app.get('/', (req, res) => {
  res.send(200);
});

app.get('/products/:id', (req, res) => {
  let id = req.params;
  console.log('id of req', id);
  Product.find({}).then((data) => {
    res.send(data);
  });
});

app.listen(PORT, () => console.log('Server is running on port', PORT));