const AWS = require('aws-sdk')
const s3 = new AWS.S3()
   
exports.handler = async function(event) {
  const buckets = await s3.listBuckets().promise()
  return buckets
}