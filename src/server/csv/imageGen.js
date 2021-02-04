const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let faker = require('faker');

let productIds = [];
let genImages = (num) => {
  const imageWriter = createCsvWriter({
    path: 'src/server/csv/images.csv',
    header: [
      {id: 'productId', title: 'productId'},
      {id: 'imgUrl', title: 'imgUrl'},
      {id: 'imgDesc', title: 'imgDesc'}
    ]
  });
  let timeStart = new Date().getTime();
  let imageData = [];
  for (let i = 0; i < num; i++) {
    if (i % 100000 === 0) { console.log(`Generating Image: ${i}`); }
    let imgUrl = faker.image.technics();
    let imgDesc = faker.lorem.sentence();
    imageData.push({productId: productIds[i], imgUrl: imgUrl, imgDesc: imgDesc});
    // for (let u = 0; u < 3; u++) {
    //   let imgUrl = faker.image.technics();
    //   let imgDesc = faker.lorem.sentence();
    //   imageData.push({productId: productIds[i], imgUrl: imgUrl, imgDesc: imgDesc});
    // }
  }

  let timeEnd = new Date().getTime();
  console.log(`Gen Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);

  imageWriter
    .writeRecords(imageData)
    .then(()=> console.log(`Image Data: ${imageData.length} records +`));

  timeEnd = new Date().getTime();
  console.log(`Total Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);
};

fs.createReadStream('src/server/csv/ids.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (productIds.length % 100000 === 0) { console.log(`Loading Id: ${productIds.length}`); }
    productIds.push(data.productId);
  })
  .on('end', () => {
    fs.writeFile('src/server/csv/images.csv', '', () => { genImages(10000000); });
  });