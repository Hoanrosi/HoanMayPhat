require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Create an S3 client instance
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: "ap-southeast-1",
});

// Configure Multer-S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "truongan912",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: async function (req, file, cb) {
            const userId = req.params.id; // Assuming the User model has an 'id' field

            // Delete the existing file with the same key if it exists
            try {
                const command = new DeleteObjectCommand({
                    Bucket: "truongan912",
                    Key: userId + ".jpg",
                });
                await s3.send(command);
            } catch (error) {
                console.error("Error deleting existing file:", error);
            }

            const fileName = userId + ".jpg";
            cb(null, fileName);
        },
    }),
});

module.exports = upload;
