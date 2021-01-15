const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    platform: String,
    stars: Number,
    ratings: Number,
    description: String,
    price: String,
    stock: Number,
    shipping: {
      date: Date,
      supplier: String
    },
    features: [
      String,
      String,
      String,
    ],
    description: String,
    photo: {
      url: String,
      description: String
    }
    // information: {
    //   asin: String,
    //   releaseDate: Date,
    //   ranks: [
    //     String
    //   ],
    //   dimensions: String,
    //   binding: String,
    //   rated: String,
    //   model: Number,
    //   weight: String,
    //   manufacturer: String,
    //   batteries: String,
    //   date1st: Date,
    // }
  }

);

const Products = mongoose.model('Products', productSchema);

module.exports = Products;