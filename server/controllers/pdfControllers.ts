import db from '../configs/DBConfig.ts';

interface PdfController {
  uploadPdf: (title: string, uploader: string) => Promise<number>;
}

const pdfController: PdfController = {
  uploadPdf: async (title: string, uploader: string): Promise<number> => {
    try {
      const query = `
        INSERT INTO uploadedPDFs (title, uploader)
        VALUES ($1, $2)
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
