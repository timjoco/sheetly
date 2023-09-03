import { supabase } from '../configs/supabase.ts';

interface PdfController {
  uploadPdf: (title: string, uploader: string, pdfName: string) => void;
}

const pdfController: PdfController = {
  uploadPdf: async (title: string, uploader: string, pdfName: string) => {
    await supabase.from('pdfs').upsert([
      {
        title: title,
        uploader: uploader,
        pdf_name: pdfName,
      },
    ]);
  },
};

export default pdfController;
