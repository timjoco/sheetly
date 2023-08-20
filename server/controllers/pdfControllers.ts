import db from '../configs/DBConfig.ts';

interface PdfController {
  uploadPdf: (title: string, uploader: string) => Promise<number>;
}

const pdfController: PdfController = {
  uploadPdf: async (title: string, uploader: string): Promise<number> => {
    try {
      const query = `
        INSERT INTO pdfs (title, uploader, file_path)
        VALUES ($1, $2, $3)
        RETURNING id;
      `;
      const result = await db.one(query, [title, uploader]);
      return result.id;
    } catch (error) {
      throw error;
    }
  },
};

export default pdfController;
