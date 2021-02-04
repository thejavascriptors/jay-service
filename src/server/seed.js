let faker = require('faker');
const fs = require('fs');
const csv = require('csv-parser');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'sdc',
  host: 'localhost',
  port: 5432
});


let seedDB = () => {
  let originalStart = new Date().getTime();
  let seedImage = () => {
    console.log('SEEDING IMAGE ...');
    let start = new Date().getTime();
    let imageCSVPath = '/private/tmp/sdc-csv/images.csv';
    let imageQuery = `COPY images FROM '${imageCSVPath}' DELIMITER ',' CSV HEADER`;
    pool.query(imageQuery, (err, response) => {
      if (err) { return console.log(err); }
      console.log('---------- IMAGE SUCCESS ----------');
      let end = new Date().getTime();
      console.log(`Seeeding Time: ${Math.floor((end - start) * 100 / 1000) / 100} seconds`);
      console.log('.');
      console.log('..');
      console.log('...');
      console.log('---------- SEEDING SUCCESS ----------');
      console.log(`Seeeding Time: ${Math.floor((end - originalStart) * 100 / 60000) / 100} min / ${Math.floor((end - start) * 100 / 1000) / 100} seconds`);
    });
  };
  let seedFeature = () => {
    console.log('SEEDING FEATURE ...');
    let start = new Date().getTime();
    let featureCSVPath = '/private/tmp/sdc-csv/features.csv';
    let featureQuery = `COPY features FROM '${featureCSVPath}' DELIMITER ',' CSV HEADER`;
    pool.query(featureQuery, (err, response) => {
      if (err) { return console.log(err); }
      console.log('---------- FEATURE SUCCESS ----------');
      let end = new Date().getTime();
      console.log(`Seeeding Time: ${Math.floor((end - start) * 100 / 1000) / 100} seconds`);
      seedImage();
    });
  };
  let seedProduct2 = () => {
    console.log('SEEDING PRODUCT2 ...');
    let start = new Date().getTime();
    let product2CSVPath = '/private/tmp/sdc-csv/products2.csv';
    let seedProduct2Query = `COPY products FROM '${product2CSVPath}' DELIMITER ',' CSV HEADER`;
    pool.query(seedProduct2Query, (err, response) => {
      if (err) { return console.log(err); }
      console.log('---------- PRODUCT2 SUCCESS ----------');
      let end = new Date().getTime();
      console.log(`Seeeding Time: ${Math.floor((end - start) * 100 / 1000) / 100} seconds`);
      seedFeature();
    });
  };
  let seedProduct1 = () => {
    console.log('SEEDING PRODUCT1 ...');
    let start = new Date().getTime();
    let product1CSVPath = '/private/tmp/sdc-csv/products1.csv';
    let seedProduct1Query = `COPY products FROM '${product1CSVPath}' DELIMITER ',' CSV HEADER`;
    pool.query(seedProduct1Query, (err, response) => {
      if (err) { return console.log(err); }
      console.log('---------- PRODUCT1 SUCCESS ----------');
      let end = new Date().getTime();
      console.log(`Seeeding Time: ${Math.floor((end - start) * 100 / 1000) / 100} seconds`);
      seedProduct2();
    });
  };
  seedProduct1();
};
seedDB();


// Currently: 1 min for 100k :: 10 min for 1 mil :: 100 min / 1.5 hours for 10m
