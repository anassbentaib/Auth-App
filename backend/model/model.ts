import mongoose, { Schema } from "mongoose";
const authSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

const authModel = mongoose.model("auth", authSchema);

export default authModel;
