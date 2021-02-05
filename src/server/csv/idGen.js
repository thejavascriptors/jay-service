let faker = require('faker');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let genIds = (num) => {
  const idWriter = createCsvWriter({
    path: 'src/server/csv/ids.csv',
    header: [
      {id: 'productId', title: 'productId'},
    ]
  });
  let timeStart = new Date().getTime();
  let productIds = [];

  for (let i = 0; i < num; i++) {
    if (i % 10000 === 0) { console.log(`Generating Id: ${i}`); }
    productIds.push({productId: faker.random.alphaNumeric(12)});
  }

  idWriter
    .writeRecords(productIds)
    .then(()=> console.log(`Image Data: ${productIds.length} records +`));

  let timeEnd = new Date().getTime();
  console.log(`Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);
};
fs.writeFile('src/server/csv/ids.csv', '', () => { genIds(10000000); });






// let genCSV = (num) => {
//   // Helpers
//   let minMax = (min, max) => {
//     return Math.random() * (max - min) + min;
//   };
//   let timeStart = new Date().getTime();
//   // Create files
//   fs.writeFile('src/server/csv/products.csv', '', () => {});
//   fs.writeFile('src/server/csv/features.csv', '', () => {});
//   fs.writeFile('src/server/csv/images.csv', '', () => {});

//   const productWriter = createCsvWriter({
//     path: 'src/server/csv/products.csv',
//     header: [
//       {id: 'productId', title: 'productId'},
//       {id: 'title', title: 'title'},
//       {id: 'shorthand', title: 'shorthand'},
//       {id: 'brand', title: 'brand'},
//       {id: 'price', title: 'price'},
//       {id: 'stock', title: 'stock'},
//       {id: 'stars', title: 'stars'},
//       {id: 'ratings', title: 'ratings'},
//       {id: 'shipDate', title: 'shipDate'},
//       {id: 'shipSupplier', title: 'shipSupplier'}
//     ]
//   });

//   const featureWriter = createCsvWriter({
//     path: 'src/server/csv/features.csv',
//     header: [
//       {id: 'productId', title: 'productId'},
//       {id: 'feature', title: 'feature'}
//     ]
//   });

//   const imageWriter = createCsvWriter({
//     path: 'src/server/csv/images.csv',
//     header: [
//       {id: 'productId', title: 'productId'},
//       {id: 'imgUrl', title: 'imgUrl'},
//       {id: 'imgDesc', title: 'imgDesc'}
//     ]
//   });

//   let productIds = [];
//   let productData = [];
//   let featureData = [];
//   let imageData = [];

//   for (let i = 0; i < num; i++) {
//     productIds.push(faker.random.alphaNumeric(12));
//   }

//   // Products
//   for (let i = 0; i < num; i++) {
//     if (i % 10000 === 0) { console.log(`Generating Product: ${i}`); }
//     let title = faker.commerce.productName();
//     let shorthand = faker.lorem.words(2);
//     let brand = faker.commerce.product();
//     let price = faker.commerce.price(1.50, 799, 2, '$');
//     let stock = Math.floor(Math.random() * 1000);
//     let stars = (Math.random() * 5).toPrecision(3);
//     let ratings = Math.floor(Math.random() * 9000);
//     let shipDate = faker.date.soon(2);
//     let shipSupplier = faker.company.companyName(0);
//     productData.push({
//       productId: productIds[i],
//       title: title,
//       shorthand: shorthand,
//       brand: brand,
//       price: price,
//       stock: stock,
//       stars: stars,
//       ratings: ratings,
//       shipDate: shipDate,
//       shipSupplier: shipSupplier
//     });
//   }
//   productWriter
//     .writeRecords(productData)
//     .then(()=> console.log(`Product Data: ${productData.length} records +`));
//   let timeEnd = new Date().getTime();
//   console.log(`Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);

//   // Features
//   for (let i = 0; i < num; i++) {
//     if (i % 10000 === 0) { console.log(`Generating Feature: ${i}`); }
//     for (let u = 0; u < 3; u++) {
//       let feature = faker.lorem.sentences(3);
//       featureData.push({productId: productIds[i], feature: feature});
//     }
//   }
//   featureWriter
//     .writeRecords(featureData)
//     .then(()=> console.log(`Feature Data: ${featureData.length} records +`));
//   timeEnd = new Date().getTime();
//   console.log(`Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);

//   // Images
//   for (let i = 0; i < num; i++) {
//     if (i % 10000 === 0) { console.log(`Generating Image: ${i}`); }
//     for (let u = 0; u < 3; u++) {
//       let imgUrl = faker.image.technics();
//       let imgDesc = faker.lorem.sentence();
//       imageData.push({productId: productIds[i], imgUrl: imgUrl, imgDesc: imgDesc});
//     }
//   }
//   imageWriter
//     .writeRecords(imageData)
//     .then(()=> console.log(`Image Data: ${imageData.length} records +`));

//   timeEnd = new Date().getTime();
//   console.log(`Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);
// };
// genCSV(1000000);