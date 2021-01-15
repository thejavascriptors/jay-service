const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/products';

const db = mongoose.connect(mongoUrl);

module.exports = db;