import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CurriculumCourse from "@/models/CurriculumCourse";

import Razorpay from "razorpay";
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function GET(req,context) {
  await dbConnect();
  
  try {
    
      const course = await CurriculumCourse.findOne({
          slug: context.params.id,
        }).sort({
          createdAt: -1,
        });


    const options = {
      amount: course.price * 100, //amount in smallest currency unit
      currency: "INR",
      receipt: "course_receipt",
      notes: {
        course_id: course?._id,
      },
    };

    const order = await razorpay.orders.create(options);

    console.log("order RAZORPAY", order);

    return NextResponse.json(order);
  } catch (err) {

     console.log("ERROR", err)
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
