const AWS = require('aws-sdk')

console.log('Loading function');
        
import {S3Client, GetObjectCommand} from '@aws-sdk/client-s3';

const s3 = new S3Client({region: 'us-west-2'});


exports.handler = async function(event) {
  const buckets = await s3.listBuckets().promise()
  return buckets
}