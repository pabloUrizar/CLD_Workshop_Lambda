console.log('Loading function');
        
import {S3Client, GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import sharp from 'sharp'
import toArray from 'stream-to-array'
const s3 = new S3Client({region: 'eu-south-1'});


export const handler = async (event, context) => {
    console.log("EVENT: \n" + JSON.stringify(event));    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    }; 
    let image;
    try {
        //Get the image from the S3 bucket
        image = await s3.send(new GetObjectCommand(params));        
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
    try{
        //Transform the ReadableStream into a Buffer
        const bufferedImage = await toArray(image.Body).then((parts)=>{
            const buffers = parts.map((part => Buffer.from(part)))
            return Buffer.concat(buffers)
        })
        //Apply modification to the image
        const modifierBufferedImage = await sharp(bufferedImage).rotate(90).negate().toBuffer();
        
        //Parameters of the new image
        const params2 = {
            Bucket : bucket,
            Key: "edited_" + key,
            Body: modifierBufferedImage,
            ContentType: "image/*"
        }
        //Add new image to bucket
        const response = await s3.send(new PutObjectCommand(params2));
        console.log("RESPONSE : " + JSON.stringify(response));
        context.succeed("done");      
        return response;
    }catch(err){
        console.log(err);
        const message = `Error buffering image`   
        console.log(message);
        throw new Error(message);
    }

};
