const express = require('express');
const next = require('next');
const multer = require('multer'); // Import multer for file uploads

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Set up storage for uploaded files
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage });

    // Handle file uploads
    server.post('/upload', upload.single('file'), (req, res) => {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      // Save file information to the database and return a response
      return res.status(200).json({ message: 'File uploaded successfully.' });
    });

    // Handle other routes
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
