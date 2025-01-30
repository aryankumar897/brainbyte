import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/utils/authOptions";

import Razorpay from "razorpay";

import CourseOrder from "@/models/courseorder";
import UserCourse from "@/models/usercourse";

import CurriculumCourse from "@/models/CurriculumCourse";

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { razorpay_payment_id } = body;

  const session = await getServerSession(authOptions);
  try {
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
 console.log("payment  razorpay"  , payment)

    const value = payment.amount/100;

    const courseId = payment.notes.course_id;

    const course = await CurriculumCourse.findOne({
      _id: courseId,
    }).sort({
      createdAt: -1,
    });

    if (payment && payment.status === "captured") {
      const orders = await CourseOrder.create({
        user_id: session?.user?._id,
        course_name: course?.title,
        transaction_id:courseId,
        order_id: uuidv4(),
        payment_provider: `${payment?.method || "razorpay" }`,
        amount: value,

        payment_status: "paid",
      });

      const usercourse = await UserCourse.create({
        user_id: session?.user?._id,
        course_id: course?._id,
      });
    } else {
      return NextResponse.json(
        { failed: "payment  faield try again" },
        { status: 500 }
      );
      console.log("payment verificatiom faield  ", payment);
    }

    return NextResponse.json({ success: "payment success" }, { status: 200 });

    //    return NextResponse.json(order)
  } catch (err) {
    console.log("payment", err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
