const Product = require('./Product.js');
const db = require('./index.js');

var clearDb = function() {
  Product.deleteMany({}).then((res) => {
    console.log('Products deleted', res.n);
  });
};

clearDb();