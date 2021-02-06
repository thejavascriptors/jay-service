let faker = require('faker');
const fs = require('fs');
const { exec } = require('child_process');
var rimraf = require('rimraf');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Product = require('./mongoDB');
const secret = require('./secret');

let mongoAtlas = secret.mongoURI;
let mongoLocal = 'mongodb://127.0.0.1:27017/sdclocal';
mongoose.connect(mongoLocal, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('---------- Mongo Connected ----------'); });

// Can we use mongoimport or
let totalStart = new Date().getTime();
let writeMongoData = (num, fileNum, totalFileCount, cb) => {
  let start = new Date().getTime();
  let productData = [];
  for (let i = 0; i < num; i++) {
    if (i % 10000 === 0) {
      let currProduct = Math.floor((i / num) * 10000) / 100;
      let totalWrite = Math.floor(((totalFileCount - fileNum) / totalFileCount) * 10000) / 100;
      console.log(`Current: ${currProduct}% | ${i}/${num} ~ Total: ${totalWrite}% | ${fileNum}/${totalFileCount}`);
    }

    productData.push({
      name: faker.commerce.productName(),
      brand: faker.commerce.product(),
      stars: (Math.random() * 5).toPrecision(3),
      shorthand: faker.lorem.words(2),
      ratings: Math.floor(Math.random() * 9000),
      price: faker.commerce.price(1.50, 799, 2, '$'),
      inventory: Math.floor(Math.random() * 1000),
      features: [faker.lorem.sentences(3), faker.lorem.sentences(3), faker.lorem.sentences(3)],
      shipping: { date: faker.date.soon(2), supplier: faker.company.companyName(0) },
      photos: [
        { url: faker.image.technics(), description: faker.lorem.sentence() },
        { url: faker.image.technics(), description: faker.lorem.sentence() },
        { url: faker.image.technics(), description: faker.lorem.sentence() }
      ]
    });
  }
  let stringData = JSON.stringify(productData);
  fs.appendFile(`src/server/mongoData/mongoData${fileNum}.json`, stringData, () => {
    console.log(`----------  FILE ${fileNum}/${totalFileCount} COMPLETE ----------`);
    console.log(`~ Writing ${num} ++`);
    let end = new Date().getTime();
    console.log(`~ Writing Execution Time: ${Math.floor((end - start) * 100 / 60000) / 100} min / ${Math.floor((end - start) * 100 / 1000) / 100} sec`);
    console.log(`~ Total Elapsed Time: ${Math.floor((end - totalStart) * 100 / 60000) / 100} min`);
    cb();
  });
};
let writeMongoFiles = (numPerFile, fileCount, totalFileCount) => {
  if (fileCount === 0) {
    let totalEnd = new Date().getTime();
    console.log(`---------- FILE WRITING COMPLETE (${totalFileCount} Files) ----------`);
    return console.log(`TOTAL Writing Execution Time: ${Math.floor((totalEnd - totalStart) * 100 / 60000) / 100} min`);
  }
  console.log(`---------- Writing File: ${fileCount} (mongoData${fileCount}.txt) ----------`);
  fs.writeFile(`src/server/mongoData/mongoData${fileCount}.json`, '', function(err) {
    if (err) { return console.log(err); }
    console.log('~ Starting Write ... ');
    // 20 files, 500k each, 10 arrays, 50000 objects
    writeMongoData(numPerFile, fileCount, totalFileCount, () => {
      writeMongoFiles(numPerFile, fileCount - 1, totalFileCount);
    });
  });
};
let mongoFileSeed = () => {
  rimraf.sync('./src/server/mongoData');
  console.log('---------- DELETED MongoData Directory ----------');
  fs.mkdirSync('./src/server/mongoData');
  console.log('---------- CREATED MongoData Directory ----------');
  writeMongoFiles(100000, 100, 100);
};
// mongoFileSeed(); // Time: 14min / 10mil


let readMongoDataFile = (path, cb) => {
  let start = new Date().getTime();
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) { return console.error(err); }
    console.log('~ Reading ...');
    let parsedData = JSON.parse(data);
    let end = new Date().getTime();
    console.log(`~ Read Time: ${Math.floor((end - start) * 100 / 1000) / 100} sec`);
    cb(parsedData);
  });
};

let seedMongo = () => {
  let start = new Date().getTime();
  const mongoDataDir = 'src/server/mongoData';

  let readFile = (files, currFileIndex) => {
    if (currFileIndex < 0) {
      let end = new Date().getTime();
      let totalSec = (Math.floor((end - start) * 100 / 1000) / 100);
      let totalMin = (Math.floor((end - start) * 100 / 60000) / 100);
      console.log('---------- SEEDING DONE ----------');
      return console.log(`~ Total Seed Time: ${totalMin} min / ${totalMin} sec`);
    }
    readMongoDataFile((mongoDataDir + '/' + (files[currFileIndex])), (data) => {
      let insertStart = new Date().getTime();
      console.log(`~ Inserting From ${files[currFileIndex]} (Index: ${currFileIndex})`);
      Product.insertMany(data) // {ordered: false, w: 0}
        .then((res) => {
          let insertEnd = new Date().getTime();
          let insertTotalSec = (Math.floor((insertEnd - insertStart) * 100 / 1000) / 100);
          let insertTotalMin = (Math.floor((insertEnd - insertStart) * 100 / 60000) / 100);
          console.log(`~ Insert Time: ${insertTotalMin} min / ${insertTotalSec} sec`);
          readFile(files, currFileIndex - 1);
        })
        .catch((err) => { console.log(err); });
    });
  };
  // Product.deleteMany({})
  //   .then(() => {
  // console.log('---------- MONGODB EMPTIED ----------');
  fs.readdir(mongoDataDir, (err, files) => {
    // console.log('---------- GETTING ALL FILES ----------');
    // readFile(files, files.length - 1);
    let start = new Date().getTime();
    let fileCount = files.length - 1;
    let seedFiles = (fileIndex) => {
      if (fileIndex < 0 ) { return console.log('---------- SEEDING COMPLETE ----------'); }
      let mongoLocalImport = `mongoimport -d localsdc -c products --type json --file src/server/mongoData/${files[fileIndex]} --jsonArray`;
      let mongoAtlasImport = `mongoimport --uri "${mongoAtlas}" --collection products --drop --type json --file src/server/mongoData/${files[fileIndex]} --jsonArray`;

      exec(mongoLocalImport, (err, stdout, stderr) => {
        if (err) { return console.log(err); }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        let end = new Date().getTime();
        let seedPercent = Math.floor(((files.length - fileIndex) / files.length) * 10000) / 100;
        console.log(`~ Seeding: ${seedPercent}% | ${fileIndex}/${files.length}`);
        console.log(`~ Seeding Execution Time: ${Math.floor((end - start) * 100 / 60000) / 100} min / ${Math.floor((end - start) * 100 / 1000) / 100} sec`);
        seedFiles(fileIndex - 1);
      });
    };
    seedFiles(fileCount);

  });
  // })
  // .catch((err) => { console.log(err); });
};
seedMongo(); // Time: 8min
