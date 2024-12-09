const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/gridfs-demo';

// MongoDB Connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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

// Routes

// Upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  const { originalname, id } = req.file;
  res.status(200).json({ fileId: id, fileName: originalname });
});

// Fetch metadata for all files
app.get('/files', async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found' });
    }
    res.status(200).json(files);
  });
});

// Fetch a file by ID
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

// Delete a file
app.delete('/file/:id', async (req, res) => {
  const { id } = req.params;

  gfs.remove({ _id: mongoose.Types.ObjectId(id), root: 'uploads' }, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting file' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
