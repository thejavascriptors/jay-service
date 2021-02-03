const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
let faker = require('faker');


const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  // let id = req.params.id;
  res.send(200);
});


const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port', PORT));