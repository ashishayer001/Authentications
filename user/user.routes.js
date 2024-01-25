import express from "express";
import { RegisterUserSchema, loginUserSchema } from "./user.validation.js";
import User from "./user.module.js";
import * as bcrypt from "bcrypt";

const router = express.Router();

//register routes
router.post(
  "/user/register",
  async (req, res, next) => {
    // extract new user from req.body
    // validate new user
    // if validation fail, throw error
    // call next function
    const newUser = req.body;
    // console.log(newUser);
    try {
      const validateData = await RegisterUserSchema.validate(newUser);
      req.body = validateData;

      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    //extract user from req.body
    const newUser = req.body;

    // check if user with email already exists
    //find user
    const user = await User.findOne({ email: newUser.email });

    //!if user,throw error
    if (user) {
      return res
        .status(400)
        .send({ message: "user with this email already exists" });
    }
    //! hash password

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    // ! to generate hashed password
    // const passwords =  await bcrypt.compare(passwords,newUser.password);
    // console.log(passwords);
    //! create user
    await User.create(newUser);
    return res.status(201).send({ message: "user is created successfully" });
  }
);

// ! login
router.post(
  "/user/login",
  async (req, res, next) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;
    // validate
    try {
      const validatedData = await loginUserSchema.validate(loginCredentials);

      req.body = validatedData;

      // call next function
      next();
    } catch (error) {
      // throw error

      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;

    // find user by email
    const user = await User.findOne({ email: loginCredentials.email });

    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials." });
    }

    // check for password match(bcrypt)
    const isPasswordMatch = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );

    // if not password match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials." });
    }

    // send response

    return res.status(200).send({ message: "logged in" });
  }
);
export default router;
