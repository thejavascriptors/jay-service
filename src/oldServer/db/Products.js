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
    shorthand: String,
    price: String,
    stock: Number,
    shipping: {
      date: String,
      supplier: String
    },
    features: [
      String,
      String,
      String,
    ],
    description: String,
    photos: [
      {
        url: String,
        description: String
      },
      {
        url: String,
        description: String
      },
      {
        url: String,
        description: String
      }
    ]
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

const Product = mongoose.model('Products', productSchema);

module.exports = Product;