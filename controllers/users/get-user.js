const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const User = require("./../../models/user");

const AppError = require("../utils/appError");

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

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  let getObjectParams;

  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password", "email", "updatedAt", "deletedAt"],
      },
    });
    if (!user) {
      throw new AppError("User Not Found", 404);
    }

    getObjectParams = {
      Bucket: bucketName,
      Key: user.photo,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    const books = await user.getBooks({
      attributes: {
        exclude: ["UserId", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    if (!books.length) {
      return res.json({
        status: "success",
        user,
        userPhoto: url,
        books: "User Doesn't have a books",
      });
    }

    res.status(200).json({
      status: "success",
      user,
      userPhoto: url,
      numOfBooks: books.length,
      books,
    });
  } catch (err) {
    let statusCode;
    if (err instanceof AppError) {
      statusCode = err.statusCode;
    } else {
      statusCode = 400;
    }

    res.status(statusCode).json({
      status: "fail",
      err: err.message,
    });
  }
};

module.exports = getUser;
