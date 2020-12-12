// External imports
const path = require("path");
const multer = require("multer");

// Internal imports
const ImageModel = require("./models/image.model");
const UserModel = require("./models/user.model");
const Logger = require("../utils/logger");

const logger = new Logger("Images");

// helpers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, req.user.username + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: { fileSize: 737280 },
  onError: (err, next) => {
    console.log("error", err);
    next(err);
  },
}).fields([{ name: "NEW_BANK_IMAGE" }]);

// controllers
async function getAllImages(req, res) {
  try {
    logger.debug(`Running getAllImages()`);
    const images = await ImageModel.find();
    return res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    logger.error(`Running getAllImages() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}

async function checkImage(req, res, next) {
  try {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json({ success: false, error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(500).json({ success: false, error: err.message });
      }
      next();
    });
  } catch (error) {
    logger.error(`Running checkImage() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}

async function uploadImage(req, res) {
  try {
    logger.debug(`Running uploadImage()`);
    let user = await UserModel.findById(req.user._id);
    if (req.files === undefined)
      return res
        .status(400)
        .json({ success: false, err: "No image has been uploaded !" });
    if (req.files["NEW_BANK_IMAGE"]) {
      const image = new ImageModel({
        createdBy: req.user._id,
        path: "/images/" + req.files["NEW_BANK_IMAGE"][0].filename,
      });
      await image.save();
      const user = await UserModel.findById(req.user._id);
      user.images.push(image._id);
      await user.save();
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    logger.error(`Running uploadImage() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}

async function addImageTag(req, res) {
  try {
    logger.debug(`Running addImageTag()`);
    const image = await ImageModel.findById(req.params.id);
    const { tags } = req.body;
    if (!image || !tags) return res.status(400).end();
    tags.forEach((tag) => {
      image.tags.push(tag);
    });
    await image.save();
    return res.status(200).json({
      success: true,
      message: "tags add successfully to image",
    });
  } catch (error) {
    logger.error(`Running addImageTag() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}

async function deleteImage(req, res) {}

async function searchImage(req, res) {}

module.exports = {
  getAllImages,
  uploadImage,
  checkImage,
  deleteImage,
  addImageTag,
  searchImage,
};
