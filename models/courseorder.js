

// Import the mongoose library to define schemas and interact with MongoDB
import mongoose from "mongoose";

// Import the existing User model to reference it in the schema
import User from "./user";

// Define the CourseOrder schema that tracks orders made by users for courses
const courseOrderSchema = new mongoose.Schema(
  {
    // 'user_id' field stores the reference to the User who made the purchase
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // The field type is an ObjectId (MongoDB's default for referencing other documents)
      ref: 'User', // 'ref' points to the "User" model, creating a relationship with the User schema
      required: true, // This field is required and cannot be left empty
    },

    // 'course_name' field stores the name of the course purchased by the user
    course_name: {
      type: String, // The field type is a string
      required: true, // This field is required and cannot be left empty
    },

    // 'transaction_id' field stores the unique ID of the transaction processed
    transaction_id: {
      type: String, // The field type is a string
      required: true, // This field is required and cannot be left empty
    },

    // 'order_id' field stores the unique ID of the order placed for the course
    order_id: {
      type: String, // The field type is a string
      required: true, // This field is required and cannot be left empty
    },

    // 'payment_provider' field stores the name of the payment provider (e.g., PayPal, Stripe)
    payment_provider: {
      type: String, // The field type is a string
    },

    // 'amount' field stores the total amount paid by the user for the course
    amount: {
      type: Number, // The field type is a number
      required: true, // This field is required and cannot be left empty
      min: 0, // Ensures that the amount cannot be negative
    },

    // 'payment_status' field stores the status of the payment (e.g., 'success', 'failed')
    payment_status: {
      type: String, // The field type is a string
    },
  },
  {
    // 'timestamps: true' automatically adds 'createdAt' and 'updatedAt' fields to the schema
    timestamps: true,
  }
);

// Export the CourseOrder model, or use the existing model if it already exists
export default mongoose.models.CourseOrder || mongoose.model('CourseOrder', courseOrderSchema);






























// import  mongoose  from "mongoose";

// import User from "./user";

// const courseOrderSchema = new mongoose.Schema(
//   {
//     user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Assuming you have a User model
//       required: true,
//     },
//     course_name: {
//       type: String,
//       required: true,
//     },
//     transaction_id: {
//       type: String,
//       required: true,
//     },
//     order_id: {
//       type: String,
//       required: true,
     
//     },
//     payment_provider: {
//       type: String,
     
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     payment_status: {
//       type: String,
     
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields automatically
//   }
// );

// export default mongoose.models.CourseOrder || mongoose.model('CourseOrder', courseOrderSchema);

