let faker = require('faker');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'sdc',
  host: 'localhost',
  port: 5432
});

let errorCount = 0;
let successCount = 0;
let primariesComplete = 0;
let genRecord = () => {
  // Helpers
  let minMax = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  // Products
  let id = faker.random.alphaNumeric(12)
  let title = faker.commerce.productName();
  let shorthand = faker.lorem.words(2);
  let brand = faker.commerce.product();
  let price = faker.commerce.price(1.50, 799, 2, '$');
  let stock = Math.floor(Math.random() * 1000);
  let stars = (Math.random() * 5).toPrecision(3);
  let ratings = Math.floor(Math.random() * 9000);
  let shipDate = faker.date.soon(2);
  let shipSupplier = faker.company.companyName(0);
  let mainQuery = `INSERT INTO products(id, title, shorthand, brand, price, stock, stars, ratings, shipdate, shipsupplier) VALUES('${id}', '${title}', '${shorthand}', '${brand}', '${price}', ${stock}, ${stars}, ${ratings}, '${shipDate}', '${shipSupplier}')`;
  pool.query(mainQuery, (err, res) => {
    if (err) {
      // console.log(err);
      errorCount++;
    } else {
      successCount++;
    }
  });
  // Features
  for (let i = 0; i < 1; i++) {
    let feature = faker.lorem.sentences(3);
    let featureQuery = `INSERT INTO features(id, feature) VALUES('${id}', '${feature}')`;
    pool.query(featureQuery, (err, res) => {
      if (err) {
        // console.log(err);
        errorCount++;
      } else {
        successCount++;
      }
    });
  }
  // Images
  for (let i = 0; i < 1; i++) {
    let imgUrl = faker.image.technics();
    let imgDesc = faker.lorem.sentence();
    let imgQuery = `INSERT INTO images(id, imageurl, descriptions) VALUES('${id}', '${imgUrl}', '${imgDesc}')`;
    pool.query(imgQuery, (err, res) => {
      if (err) {
        // console.log(err);
        errorCount++;
        // console.log('MAKING ERROR');
      } else {
        successCount++;
        // console.log('INSERTING');
      }
    });
  }
};

let seedDB = (num) => {
  for (let i = 0; i < num; i++) {
    genRecord();
  }

  let firstStart = new Date().getTime();
  let checker = setInterval(() => {
    let currEnd = new Date().getTime();
    console.log(`Time: ${Math.floor(((currEnd - firstStart) / 60000) * 100) / 100} min`);
    let percent = Math.floor((((successCount + errorCount) / (num * 3) * 100) * 100)) / 100;
    console.log(`${percent}% :: ${successCount + errorCount} / ${num * 3})`);

    if (num * 3 === (successCount + errorCount)) {
      console.log('---------- FINAL ----------');
      console.log('~~ TIME ~~');
      lastEnd = new Date().getTime();
      let executionTimeMin = Math.floor(((lastEnd - firstStart) / 60000) * 100) / 100;
      let executionTimeSec = Math.floor(((lastEnd - firstStart) / 1000) * 100) / 100;
      console.log(`Execution Time: ${executionTimeMin} min - ${executionTimeSec} s`);
      console.log('~~ SUCCESS ~~');
      console.log(`Successes: ${successCount}`);
      console.log(`Errors: ${errorCount}`);
      console.log(`Error Rate: ${Math.floor((errorCount / num * 100) * 100) / 100}%`);
      clearInterval(checker);
    }
  }, 3000);
};
seedDB(10000);
// Currently: 1 min for 100k :: 10 min for 1 mil :: 100 min / 1.5 hours for 10m
