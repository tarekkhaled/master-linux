// Internal imports
const UserModel = require("../src/models/user.model");
const { createToken, verifyToken } = require("./sec");
const Logger = require("./logger");
const logger = new Logger("Auth (controllers) :: ");

async function loginUser(req, res) {
  try {
    logger.debug("Running loginUser() with body,", req.body);
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      return res.status(200).send({
        success: false,
        message: "Username not found !",
      });
    1;
    const isMatched = await user.checkPassword(req.body.password);

    if (!isMatched)
      return res.status(200).send({
        success: false,
        message: "User Password not Matched !",
      });

    const token = createToken(user);
    res
      .cookie("w_auth", token)
      .status(200)
      .json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
        },
      });
  } catch (error) {
    logger.error(`Running loginUser() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}

async function signupUser(req, res) {
  try {
    logger.debug("Running signupUser() with body,", req.body);
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(400).end();
    }
    const token = createToken(newUser);
    res.cookie("w_auth", token);
    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    logger.error(`Running signupUser() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}

function logoutUser(req, res) {
  try {
    logger.debug(`Running loginUser ()`);
    res.clearCookie("w_auth");
    res.status(200).json({
      success: true,
      message: "User logged out successfully :(",
    });
  } catch (error) {
    logger.error(`Running logoutUser() failed due to `, error);
    res.status(400).json({ success: false, error });
  }
}


async function permissionAllowed(req, res, next) {
  try {
    logger.debug(`Running permissionAllowed()`);
    if(/\/tags/g.test(req.originalUrl) || req.originalUrl === '/api/images') {
      return next();
    }
    const bearer = req.headers.authorization;
    if (!bearer) {
      return res.status(401).end();
    }
    const token = bearer.split("Bearer ")[1].trim();
    let payload = await verifyToken(token);

    const user = await UserModel.findById(payload.id)
      .select("-password")
      .lean()
      .exec();
    if (!user) {
      return res.status(401).end();
    }
    req.user = user;
    next();
  } catch (e) {
    logger.error(`Running permissionAllowed() failed due to `, error);
    res.status(401).end();
  }
}

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  permissionAllowed,
};
