const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let faker = require('faker');

let productIds = [];
let genProducts = (num) => {
  const productWriter1 = createCsvWriter({
    path: 'src/server/csv/products1.csv',
    header: [
      {id: 'productId', title: 'productId'},
      {id: 'title', title: 'title'},
      {id: 'shorthand', title: 'shorthand'},
      {id: 'brand', title: 'brand'},
      {id: 'price', title: 'price'},
      {id: 'stock', title: 'stock'},
      {id: 'stars', title: 'stars'},
      {id: 'ratings', title: 'ratings'},
      {id: 'shipDate', title: 'shipDate'},
      {id: 'shipSupplier', title: 'shipSupplier'}
    ]
  });
  const productWriter2 = createCsvWriter({
    path: 'src/server/csv/products2.csv',
    header: [
      {id: 'productId', title: 'productId'},
      {id: 'title', title: 'title'},
      {id: 'shorthand', title: 'shorthand'},
      {id: 'brand', title: 'brand'},
      {id: 'price', title: 'price'},
      {id: 'stock', title: 'stock'},
      {id: 'stars', title: 'stars'},
      {id: 'ratings', title: 'ratings'},
      {id: 'shipDate', title: 'shipDate'},
      {id: 'shipSupplier', title: 'shipSupplier'}
    ]
  });
  let timeStart = new Date().getTime();
  let productData1 = [];
  let productData2 = [];
  for (let i = 0; i < num; i++) {
    let title = faker.commerce.productName();
    let shorthand = faker.lorem.words(2);
    let brand = faker.commerce.product();
    let price = faker.commerce.price(1.50, 799, 2, '$');
    let stock = Math.floor(Math.random() * 1000);
    let stars = (Math.random() * 5).toPrecision(3);
    let ratings = Math.floor(Math.random() * 9000);
    let shipDate = faker.date.soon(2);
    let shipSupplier = faker.company.companyName(0);
    let currData = {
      productId: productIds[i],
      title: title,
      shorthand: shorthand,
      brand: brand,
      price: price,
      stock: stock,
      stars: stars,
      ratings: ratings,
      shipDate: shipDate,
      shipSupplier: shipSupplier
    };
    if (i < 5000000) {
      productData1.push(currData);
      if (i % 100000 === 0) { console.log(`Generating Product: ${i} :: 1`); }
    } else {
      productData2.push(currData);
      if (i % 100000 === 0) { console.log(`Generating Product: ${i} :: 2`); }
    }
  }

  let timeEnd = new Date().getTime();
  console.log(`Gen Execution Time: ${Math.floor((timeEnd - timeStart) / 60000 * 100) / 100} minutes`);

  productWriter1
    .writeRecords(productData1)
    .then(() => console.log(`Product Data: ${productData1.length} records +`))
    .then(() => {
      productWriter2
        .writeRecords(productData2)
        .then(() => console.log(`Product Data: ${productData2.length} records +`));
    });

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
    fs.writeFile('src/server/csv/products1.csv', '', () => { fs.writeFile('src/server/csv/products2.csv', '', () => { genProducts(10000000); }); });
  });