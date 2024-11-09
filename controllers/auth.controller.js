import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";


export const signUp = async (req, res) => {
  const {
    email,
    username,
    password,
    Name,
    location,
    age,
    Occupation,
    Institute,
    WorkEnv,
    Goals,
    Intro,
  } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const data = {
      uuid: uuidv4(),
      email: email,
      username: username,
      password: hashedPassword,
      Name: Name,
      personalInfo: {
        location: location,
        age: age,
        Occupation: Occupation,
        Institute: Institute,
        WorkEnv: WorkEnv,
      },
      Goals: Goals,
      Intro: Intro,
    };
    const result = await User.create(data);
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
