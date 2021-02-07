let faker = require('faker');
const fs = require('fs');
var rimraf = require('rimraf');

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
mongoFileSeed(); // Time: 14min / 10mil