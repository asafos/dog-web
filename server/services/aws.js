import express from "express";
import AWS from 'aws-sdk';
import fs from 'fs';
import fileType from 'file-type';
import bluebird from 'bluebird'
import multiparty from 'multiparty';
const router = express.Router();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // region: 'us-east-1'
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();
const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.BUCKET_NAME,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
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