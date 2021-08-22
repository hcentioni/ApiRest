'use strict';
const process = require('process'); // Required to mock environment variables

// [START gae_flex_storage_app]
const {format} = require('util');
const Multer = require('multer');
import {Router} from  'express'

const router = Router()
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();


// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);


// Process the file upload and upload to Google Cloud Storage.
router.post('/api/uploadgoogle', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
 //create name for file the imagen
  const ext = req.file.originalname.split('.').pop()
  const fileName=`${Date.now()}.${ext}`

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);

});

router.delete('/api/uploadgoogle/:fileName', async(req,res)=>{
  try {
      await storage.bucket(bucket.name).file(req.params.fileName).delete();
      console.log(`gs://${bucket.name}/${req.params.fileName} deleted`);
      res.json('Elimino');
  } catch (err) {
      console.log('Error: ' , err);
      let respuesta = {
        error: true,
        status: 500,
        mensaje: 'Imagen inexistente'
    };
    res.status(500);    
    res.json(respuesta); 
  }
})
export default router
