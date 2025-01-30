import  mongoose  from "mongoose";

import User from "./user";

const courseOrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
     
    },
    payment_provider: {
      type: String,
     
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_status: {
      type: String,
     
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.models.CourseOrder || mongoose.model('CourseOrder', courseOrderSchema);

