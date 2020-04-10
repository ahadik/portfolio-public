/*
 * NOTE: You'll need to follow the steps outlined in aws-config.js.example
 * before running this deploy script for the first time
 */

const s3 = require('s3');
const path = require('path');

const DIRECTORY = '../public';

let [,, ...args] = process.argv;

const environment = args[0];

let awsConfig;

if ( environment === '--staging') {
  awsConfig = require('./aws-config.staging');
} else if (environment === '--production') {
  awsConfig = require('./aws-config.production');
} else {
  console.error("No environment flag set! Must pass either --staging or --production.");
  return;
}

const client = s3.createClient({
  s3Options: {
    sslEnabled: true,
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey
  }
});

const params = {
  localDir: path.resolve(__dirname, DIRECTORY),
  // remove s3 objects that have no corresponding local file.
  deleteRemoved: true,
  s3Params: {
    Bucket: awsConfig.bucketName,
    ACL: 'public-read'
  }
};

const uploader = client.uploadDir(params);

uploader.on('error', (err) => {
  console.error('unable to sync:', err.stack);
});

uploader.on('progress', () => {
  console.log('progress', uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', () => {
  console.log('done uploading');
});
