



// Import the mongoose library to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Import the existing models for User and CurriculumCourse to create relationships
import User from "./user"; // Assuming the User model exists in a separate file
import CurriculumCourse from "./CurriculumCourse"; // Assuming the CurriculumCourse model exists in a separate file

// Define the UserCourse schema that links users to courses they've enrolled in
const userCourseSchema = new mongoose.Schema(
  {
    // 'user_id' field to reference the user who enrolled in the course
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // The field type is an ObjectId (MongoDB's default for referencing other documents)
      ref: "User", // The 'ref' points to the "User" model, creating a relationship with the User schema
      required: true, // This field is required and cannot be left empty
    },

    // 'course_id' field to reference the course that the user enrolled in
    course_id: {
      type: mongoose.Schema.Types.ObjectId, // The field type is an ObjectId
      ref: "CurriculumCourse", // The 'ref' points to the "CurriculumCourse" model, creating a relationship with the CurriculumCourse schema
      required: true, // This field is required and cannot be left empty
    },

    // 'purchase_date' field to record when the user purchased or enrolled in the course
    purchase_date: {
      type: Date, // The field type is a Date
      default: Date.now, // The default value is the current date and time
    },
  },
  {
    // 'timestamps: true' adds automatic 'createdAt' and 'updatedAt' fields to the schema
    timestamps: true,
  }
);

// Export the UserCourse model, or use the existing model if it already exists
export default mongoose.models.UserCourse ||
  mongoose.model("UserCourse", userCourseSchema);






















// import mongoose from "mongoose";
// import User from "./user";
// import CurriculumCourse from "./CurriculumCourse";
// const userCourseSchema = new mongoose.Schema(
//   {
//     user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Assuming you have a User model
//       required: true,
//     },
//     course_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "CurriculumCourse", // Assuming you have a Course model
//       required: true,
//     },
//     purchase_date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.models.UserCourse ||
//   mongoose.model("UserCourse", userCourseSchema);
