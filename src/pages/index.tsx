import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>Upload a file to the server:</p>
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
            <input type="submit" value="Upload" />
          </form>
          {/* <UploadPdfForm /> */}
        </div>
      </main>
    </>
  );
}
