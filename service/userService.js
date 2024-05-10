const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return new Error("email and password not valid");
  }
  // 3) generate token
  const token = createToken(user._id);

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});

exports.signUp = async (req, res, next) => {
  // console.log(req);
  const { username, email, password } = req.body;

  try {
    // 1) Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError("User already exists with this email", 400));
    }

    // 2) Create a new user with the hashed password (handled by middleware)
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // 4) Send response to client
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    // Handle any errors that occur during the sign up process
    console.log(error);
  }
};

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { username, email, password, phone } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  // Set the fields that are allowed to be updated
  if (username) user.username = username;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (password) user.password = password;

  // Hash password if modified
  if (password) {
    user.password = await bcrypt.hash(password, 12);
  }

  await user.save();
  delete user._doc.password; // Ensure password is not sent back

  res.status(200).json({
    message: "Profile updated successfully",
    data: user,
  });
});

exports.forgetPasswordSendEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  const message = "your code : " + code;
  await sendEmail({
    email: email,
    subject: "Your password reset code (valid for 10 min)",
    message,
  });
  user.code = code;
  await user.save();
  res.status(200).json({
    message: " successfully",
  });
});

exports.forgetPasswordVerifyCode = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  const user = await User.findOne({ code });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    message: " successfully",
  });
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const { password, code } = req.body;

  const user = await User.findOne({ code: code });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  user.password = password;
  user.code = undefined;
  await user.save();
  res.status(200).json({
    message: " successfully",
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(
      new Error("You are not logged in. Please log in to access this route.")
    );
  }

  try {
    // 2) Verification of the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new Error("The user belonging to this token no longer exists.")
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    // Handle errors from JWT verification, such as token expired or malformed
    return next(new Error("Invalid token. Please log in again."));
  }
});
