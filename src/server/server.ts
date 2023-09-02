import express, { Request, Response } from 'express';
import multer from 'multer';
import next from 'next';
import pdfController from './controllers/pdfControllers.ts';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(express.json());

app
  .prepare()
  .then(() => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the upload directory
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage });

    server.post(
      '/upload',
      upload.single('file'),
      async (req: Request, res: Response) => {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded.' });
        }
        // Save file information to the database
        const { title, uploader } = req.body;
        try {
          const pdfId = await pdfController.uploadPdf(title, uploader);
          return res
            .status(200)
            .json({ message: 'File uploaded successfully.', pdfId });
        } catch (error) {
          console.error('Error uploading PDF:', error);
          return res.status(500).json({ error: 'Internal server error.' });
        }
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
