import { supabase } from '../configs/supabase.ts';

interface PdfController {
  uploadPdf: (title: string, uploader: string) => Promise<string>;
}

const pdfController: PdfController = {
  uploadPdf: async (title: string, uploader: string): Promise<string> => {
    try {
      const { data, error } = await supabase.from('pdfs').upsert([
        {
          title: title,
          uploader: uploader,
        },
      ]);

      if (error) {
        throw error;
      }

      // Adjust the type assertion to handle null
      const dataArray: { id?: string | null }[] = data as unknown as {
        id?: string | null;
      }[];

      if (dataArray && dataArray.length > 0) {
        const insertedId = dataArray[0]?.id;

        if (insertedId) {
          return insertedId;
        } else {
          throw new Error('Upload failed. No UUID returned.');
        }
      } else {
        throw new Error('Upload failed. No UUID returned.');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default pdfController;
