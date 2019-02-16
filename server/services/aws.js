import express from "express";
import AWS from 'aws-sdk';
import fs from 'fs';
import fileType from 'file-type';
import bluebird from 'bluebird'
import multiparty from 'multiparty';
const router = express.Router();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAJB23JHUTQW2S72HA',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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',
    region: 'eu-central-1'
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();
const uploadFile = async (buffer, name, type) => {
    const nameSplit = name.split('.');
    nameSplit.pop();
    name = nameSplit.join('.');
    try {
        const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.BUCKET_NAME || 'dog-web-article-images',
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    // await s3.getBucketPolicy(console.log, {Bucket: process.env.BUCKET_NAME || 'dog-web-article-images',});
    // await s3.createBucket({
    //     Bucket : process.env.BUCKET_NAME || 'dog-web-article-images',
    //     ACL : 'public-read'
    // }).promise()
    return s3.upload(params).promise();
} catch (e) {
    console.error('bucket creation failed');
    throw e;
}
};

export const uploadImage = async (image) => {
    if (image && image.base64) {
        // const buffer = fs.readFileSync(image.path);
        const buffer = new Buffer(image.base64.replace(/^data:image\/\w+;base64,/, ""),'base64');
        const type = fileType(buffer);
        const data = await uploadFile(buffer, image.name, type);
        return data.Location;
    } else {
        throw { message: "There was an error processing your images." }
    }
};
export default router;