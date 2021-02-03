const Product = require('./Products.js');
const db = require('./index.js');

// clears the Products database and returns number of cleared items
var clearDb = function() {
  Product.deleteMany({}).then((res) => {
    console.log('Products deleted', res.n);
  });
};

clearDb();