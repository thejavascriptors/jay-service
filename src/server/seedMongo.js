const fs = require('fs');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const Product = require('./mongoDB');
const secret = require('./secret');

let mongoAtlas = secret.mongoURI;
let mongoLocal = 'mongodb://127.0.0.1:27017/sdclocal';
mongoose.connect(mongoAtlas, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('---------- Mongo Connected ----------'); });


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

  // let readFile = (files, currFileIndex) => {
  //   if (currFileIndex < 0) {
  //     let end = new Date().getTime();
  //     let totalSec = (Math.floor((end - start) * 100 / 1000) / 100);
  //     let totalMin = (Math.floor((end - start) * 100 / 60000) / 100);
  //     console.log('---------- SEEDING DONE ----------');
  //     return console.log(`~ Total Seed Time: ${totalMin} min / ${totalMin} sec`);
  //   }
  //   readMongoDataFile((mongoDataDir + '/' + (files[currFileIndex])), (data) => {
  //     let insertStart = new Date().getTime();
  //     console.log(`~ Inserting From ${files[currFileIndex]} (Index: ${currFileIndex})`);
  //     Product.insertMany(data) // {ordered: false, w: 0}
  //       .then((res) => {
  //         let insertEnd = new Date().getTime();
  //         let insertTotalSec = (Math.floor((insertEnd - insertStart) * 100 / 1000) / 100);
  //         let insertTotalMin = (Math.floor((insertEnd - insertStart) * 100 / 60000) / 100);
  //         console.log(`~ Insert Time: ${insertTotalMin} min / ${insertTotalSec} sec`);
  //         readFile(files, currFileIndex - 1);
  //       })
  //       .catch((err) => { console.log(err); });
  //   });
  // };
  // Product.deleteMany({})
  //   .then(() => {
  // console.log('---------- MONGODB EMPTIED ----------');
  fs.readdir(mongoDataDir, (err, files) => {
    // console.log('---------- GETTING ALL FILES ----------');
    // readFile(files, files.length - 1);
    let start = new Date().getTime();
    let fileCount = files.length - 1; // Switched to input
    let seedFiles = (fileIndex, seedErr) => {

      if (fileIndex < 0 ) { return console.log('---------- SEEDING COMPLETE ----------'); }
      let mongoLocalImport = `mongoimport -d localsdc -c products --type json --file src/server/mongoData/${files[fileIndex]} --jsonArray`;
      let mongoAtlasImport = `mongoimport --uri "${mongoAtlas}" --collection products --type json --file src/server/mongoData/${files[fileIndex]} --jsonArray`;
      // Create method for handling removing currently imported data for current file on ERR
      // if (seedErr) {
      //   for (let document of )
      // }
      exec(mongoAtlasImport, (err, stdout, stderr) => {
        if (err) {
          seedFiles(fileIndex, true);
          return console.log(err);
        }
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

let dropDB = () => {
  let dropLocal = 'mongoimport -d localsdc -c products --drop --file src/server/drop.json';
  let dropAtlas = `mongoimport --uri "${mongoAtlas}" --collection products --drop --file src/server/drop.json`;

  exec(dropLocal, (err, stdout, stderr) => {
    if (err) { return console.log(err); }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};
// dropDB(); // Drop DB
//   500k -> 500mb
//  1000k -> 500mb
//  5000k -> 500mb
// 10000k -> 500mb
