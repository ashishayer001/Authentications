import mongoose from "mongoose";

 export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true, //E11000 duplicate key error
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// create table

const User = mongoose.model("User", userSchema);

export default User;
