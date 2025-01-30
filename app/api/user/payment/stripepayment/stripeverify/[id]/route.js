import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/utils/authOptions";

import Stripe from "stripe";
import CourseOrder from "@/models/courseorder";
import UserCourse from "@/models/usercourse";
import CurriculumCourse from "@/models/CurriculumCourse";

const stripeInstance = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

export async function GET(req, context) {
  await dbConnect();
  //const body = await req.json();
 // const { sessionid } = body;

  const session = await getServerSession(authOptions);
  try {
    const stripesession = await stripeInstance.checkout.sessions.retrieve(
      context?.params?.id
    );

    console.log("stripesession ", stripesession);


  
    
    const value = stripesession?.amount_total ? stripesession.amount_total / 100 : 0;

    const sess = stripesession?.metadata?.course_id;
    const course_id = stripesession?.metadata?.course_id;

 const course = await CurriculumCourse.findOne({
      _id: course_id ,
    }).sort({
      createdAt: -1,
    });




    if (stripesession && stripesession?.payment_status === "paid") {
     
     
     
      const orders = await CourseOrder.create({
        user_id: session?.user?._id,
        course_name: course?.title,
        transaction_id: sess,
        order_id: uuidv4(),
        payment_provider: "Stripe",
        amount: value,

        payment_status: "paid",
      });

      const usercourse = await UserCourse.create({
        user_id: session?.user?._id,
        course_id: course_id,
      });


      console.log("orders", orders);
      console.log("usercourse", usercourse);


      
    } else {
      return NextResponse.json(
        { err: "payment  faield try again" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: "payment success" }, { status: 200 });

    //    return NextResponse.json(order)
  } catch (err) {
    console.log("payment", err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
