import { Box, Input } from '@mui/material';
import SupabaseClient from '@supabase/supabase-js';
import { ChangeEvent } from 'react';
import { supabase } from '../../server/configs/supabase.ts';

const UploadPdfForm = () => {
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (SupabaseClient) {
      const { data, error } = await supabase.storage
        .from('pdfs')
        .upload('public' + file?.name, file as File, {
          cacheControl: '3600',
          upsert: false,
        });

      if (data) {
        console.log(data);
      } else if (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      <form action="/upload" method="POST" encType="multipart/form-data">
        <Input type="file" inputProps={{ accept: '.pdf' }} />
        <input type="submit" value="Upload" onChange={handleUpload} />
      </form>
    </Box>
  );
};

export default UploadPdfForm;
