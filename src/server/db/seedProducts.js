const db = require('./index.js');
const Product = require('./Product.js');
const faker = require('faker');

const sampleProducts = [];

for (let i = 0; i < 100; i++) {
  sampleProducts.push({
    name: faker.commerce.productName(),
    brand: faker.commerce.product(),
    stars: (Math.random() * 5).toPrecision(3),
    shorthand: faker.lorem.words(2),
    ratings: Math.floor(Math.random() * 9000),
    price: faker.commerce.price(1.50, 799, 2, '$'),
    inventory: Math.floor(Math.random() * 1000),
    features: [faker.lorem.sentences(3), faker.lorem.sentences(3), faker.lorem.sentences(3)],
    shipping: {
      date: faker.date.soon(),
      supplier: faker.company.companyName(0),
    },
    photos: {
      url: faker.image.technics(),
      description: faker.lorem.sentence()
    }

  });
}

const insertProducts = function () {
  Product.create(sampleProducts)
    .then(() => console.log('Seeded sample products'));
};


insertProducts();