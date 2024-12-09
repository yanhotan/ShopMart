const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'uploads.files', required: true }, // Reference to GridFS file
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
