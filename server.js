const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const Product = require('./models/Product'); // Import Product model

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/gridfs-demo';

// MongoDB Connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GridFS Stream
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// GridFS Storage Engine for Multer
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads',
    };
  },
});

const upload = multer({ storage });

// Route: Upload File and Save Metadata
app.post('/upload', upload.single('file'), async (req, res) => {
  const { name, price, category } = req.body;
  const fileId = req.file.id;

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      fileId,
    });

    await newProduct.save();
    res.status(200).json({
      message: 'File and metadata uploaded successfully',
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving product metadata', error });
  }
});

// Route: Get All Products with Metadata
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('fileId');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Route: Fetch File by ID
app.get('/file/:id', async (req, res) => {
  const { id } = req.params;

  gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, file) => {
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if file is an image
    if (file.contentType.startsWith('image')) {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(400).json({ message: 'Not an image file' });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
