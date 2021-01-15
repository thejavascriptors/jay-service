const Photo = require('./Photo.js');
const Product = require('./Product.js');
const db = require('./index.js');

var clearDb = function() {
  Photo.deleteMany({}).then((res) => {
    console.log('Photos deleted', res.n);
  });
  Product.deleteMany({}).then((res) => {
    console.log('Products deleted', res.n);
  });
};

clearDb();