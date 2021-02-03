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


app.get('/api/:id', (req, res) => {
  // Queries should execute in less than 50ms
  // Reach 1k rps on machine / 100 on ec2
  // API response time leess than 2000ms
  // Max error rate 1%
  // Stress test Httperf, Jmeter, Artillery,
  let id = req.params.id;

  let queryOne = `SELECT * FROM products WHERE id = '${id}'`;
  pool.query(queryOne, (err, response) => {
    console.log('GETTING');
    err ? res.send(err) : res.send(response);
  });

});


const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port', PORT));