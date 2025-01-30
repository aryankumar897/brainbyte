import mongoose from "mongoose";
import User from "./user";
import CurriculumCourse from "./CurriculumCourse";
const userCourseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CurriculumCourse", // Assuming you have a Course model
      required: true,
    },
    purchase_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserCourse ||
  mongoose.model("UserCourse", userCourseSchema);
