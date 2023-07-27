import AWS from "aws-sdk";

export const config = {
    bucketName: 'mys3-fbaaf7c7-cf4c-f494-cbf0-48a430711e78',
    region: 'us-west-2',
    accessKeyId: 'AKIAX427KBRWPSFWT5OR',
    secretAccessKey: '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',
    defaultUrl: 'user/0/defaultProfile.png'
};

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
});

export const s3 = new AWS.S3({
    params: { Bucket: config.bucketName },
    region: config.region,
});

export async function getImageWithPath(filePath) {
    //"https://mys3-fbaaf7c7-cf4c-f494-cbf0-48a430711e78.s3.us-west-2.amazonaws.com/user/2/cb3de87b-ef43-4d11-b4fb-52d1025a534e-defaultProfile.png"
    const filename = filePath?.split("amazonaws.com/")[1];
    // console.log(filename);
    try {
        const data = await s3.getObject({
            Bucket: config.bucketName,
            Key: filename, // this is the file path
        }).promise();

        const blob = new Blob([data.Body], { type: data.ContentType });
        const url = URL.createObjectURL(blob);
        return url;
    } catch (err) {
        console.error(err);
        return null; // or handle the error appropriately
    }
}

export async function getDefaultImage() {
    console.log(config.defaultUrl);
    try {
        const data = await s3.getObject({
            Bucket: config.bucketName,
            Key: config.defaultUrl, // this is the file path
        }).promise();

        const blob = new Blob([data.Body], { type: data.ContentType });
        const url = URL.createObjectURL(blob);
        return url;
    } catch (err) {
        console.error(err);
        return null; // or handle the error appropriately
    }
}