const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  platform: String,
  stars: Number,
  ratings: Number,
  shorthand: String,
  price: String,
  stock: Number,
  shipping: { date: String, supplier: String },
  features: [ String, String, String ],
  description: String,
  photos: [
    { url: String, description: String },
    { url: String, description: String },
    { url: String, description: String }
  ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;