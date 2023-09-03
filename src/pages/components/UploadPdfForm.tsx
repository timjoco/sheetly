import { Box, Button, Input } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { ChangeEvent } from 'react';
import env from '../../../env-config.js';

const UploadPdfForm = () => {

  const supabase = createClient( 
    env.REACT_APP_SUPABASE_URL as string,
    env.REACT_APP_SUPABASE_API_KEY as string,
  )

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    const {data, error} = await supabase.storage
      .from('pdfs')
      .upload('public' + file?.name, file as File, {
        cacheControl: '3600',
        upsert: false,
      });

      if(data) {
        console.log(data)
      } else if(error) {
        console.log(error)
      } 
  };

  return (
    <Box>
      <Input type="file" inputProps={{ accept: '.pdf'}} />
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
    </Box>
  );
};

export default UploadPdfForm;


{/* <div>
<div>
  <form action="/upload" method="POST" encType="multipart/form-data">
    <div>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" />
    </div>
    <div>
      <label htmlFor="uploader">Uploader:</label>
      <input type="text" id="uploader" name="uploader" />
    </div>
    <div>
      <label htmlFor="file">File:</label>
      <input type="file" id="file" name="file" />
    </div>
    <br />
    <br />
    <input type="submit" value="Upload" onChange={handleUpload}/>
  </form>
</div>
</div> */}