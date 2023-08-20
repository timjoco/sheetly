import express, { Request, Response } from 'express';
import multer from 'multer';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
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
    server.post(
      '/upload',
      upload.single('file'),
      async (req: Request, res: Response) => {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded.' });
        }
        // Save file information to the database
        const { title, uploader, path } = req.body;
        // const pdfId = await pdfController.uploadPdf(title, uploader, path);

        console.log(req.body);
        return res.status(200).json({ message: 'File uploaded successfully.' });
      }
    );

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(3000, () => {
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex: Error) => {
    console.error(ex.stack);
    process.exit(1);
  });
