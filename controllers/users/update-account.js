const upload = require("express-fileupload");
const sharp = require("sharp");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const User = require("./../../models/user");

const updateAccSchema = require("./utils/update-acc-schema");

exports.fileUpload = upload({ createParentPath: true });

exports.filterFiles = (req, res, next) => {
  if (!req.files) {
    next();
  }
  console.log(req.files);

  const fileType = req.files.photo.mimetype.split("/")[0];
  if (fileType == "image") {
    next();
  } else {
    throw new Error("U can upload Only images");
  }
};

exports.resizePhoto = async (req, res, next) => {
  if (!req.files.photo) {
    next();
  }

  // const buffer = req.files.photo.data;

  // const newPhoto = await sharp(buffer).resize(500, 500).toBuffer();
  // req.files.photo.data = newPhoto;
  next();
};

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

exports.updateAccount = async (req, res, next) => {
  // console.log(req.files);

  let params = {};

  try {
    const result = await updateAccSchema.validateAsync(req.body);

    // console.log(req.files.photo.data);

    if (req.files.photo) {
      result.photo = `user-${req.user.id}-${Date.now()}`;
      params = {
        Bucket: bucketName,
        Key: result.photo,
        Body: req.files.photo.data,
        ContentType: req.files.photo.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);
    }

    

    await User.update(result, {
      where: {
        id: req.user.id,
      },
    });
    res.json({
      status: "success",
      message: "Account Updated Successfully",
    });
  } catch (err) {
    let statusCode;
    if (err.isJoi) {
      statusCode = 422;
    } else {
      statusCode = 400;
    }

    res.status(statusCode).json({
      status: "fail",
      err: err.message,
    });
  }
};
