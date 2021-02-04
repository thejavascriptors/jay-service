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
  let queryOne = `SELECT * FROM products INNER JOIN features USING(product_id) INNER JOIN images USING(product_id) WHERE products.product_id = '${id}'`;
  pool.query(queryOne, (err, response) => {
    console.log('Querying...');
    err ? res.send(err) : res.send(response);
  });
});


const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port', PORT));