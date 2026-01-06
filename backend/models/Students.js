import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    familyName: {
      type: String,
      required: true,
      trim: true,
    },
    regNumber: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
