import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
  location: { type: String, required: true },
  age: { type: String, required: true },
  Occupation: { type: String, required: true },
  Institute: { type: String, required: true },
  WorkEnv: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Name: { type: String, required: true },
  personalInfo: { type: personalInfoSchema, required: true },
  Goals: { type: [String], required: true },
  Intro: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
