const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let faker = require('faker');

let productIds = [];
let genFeatures = (num) => {
  const featureWriter = createCsvWriter({
    path: 'src/server/csv/features.csv',
    header: [
      {id: 'productId', title: 'productId'},
      {id: 'feature', title: 'feature'}
    ]
  });
  let timeStart = new Date().getTime();
  let featureData = [];
  for (let i = 0; i < num; i++) {
    if (i % 100000 === 0) { console.log(`Generating Feature: ${i}`); }
    let productId = productIds[i];
    // let feature1 = faker.lorem.sentences(1);
    // let feature2 = faker.lorem.sentences(2);
    // let feature3 = faker.lorem.sentences(2);
    featureData.push({productId: productId, feature: 'feature1'});
    featureData.push({productId: productId, feature: 'feature2'});
    featureData.push({productId: productId, feature: 'feature3'});
  }

  let timeEnd = new Date().getTime();
  console.log(`Gen Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);

  featureWriter
    .writeRecords(featureData)
    .then(()=> console.log(`Feature Data: ${featureData.length} records +`));

  timeEnd = new Date().getTime();
  console.log(`Total Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);
};

fs.createReadStream('src/server/csv/ids.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (productIds.length % 1000000 === 0) { console.log(`Loading Id: ${productIds.length}`); }
    productIds.push(data.productId);
  })
  .on('end', () => {
    fs.writeFile('src/server/csv/features.csv', '', () => { genFeatures(10000000); });
  });