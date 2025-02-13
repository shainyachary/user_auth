import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  email: { type: String, unique: true },
  password: String,
  profileImage: String,
  resetToken: String,
});

export default mongoose.model("User", userSchema);
