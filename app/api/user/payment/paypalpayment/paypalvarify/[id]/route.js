import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { v4 as uuidv4 } from "uuid";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import CourseOrder from "@/models/courseorder";
import UserCourse from "@/models/usercourse";
import CurriculumCourse from "@/models/CurriculumCourse";

import paypal from "@paypal/checkout-server-sdk";
let environment = new paypal.core.SandboxEnvironment(
  "AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL",
  "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0"
);
let client = new paypal.core.PayPalHttpClient(environment);

export async function GET(req,context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  //const body = await req.json();
  // console.log(body)
 // const { token, payerId } = body;

  try {
    const request = new paypal.orders.OrdersCaptureRequest(context?.params?.id);
    request.requestBody({});

    const response = await client.execute(request);
    console.log("response  xxxx", response);
    const refrence = response?.result?.purchase_units[0].reference_id;

    const value =
      response?.result?.purchase_units[0].payments?.captures[0].amount?.value;

    const paypalamount = value 

    const course = await CurriculumCourse.findOne({
      _id: refrence,
    }).sort({
      createdAt: -1,
    });

    if (response?.result?.status === "COMPLETED") {
      const orders = await CourseOrder.create({
        user_id: session?.user?._id,
        course_name: course?.title,
        transaction_id: course?._id,
        order_id: uuidv4(),
        payment_provider: "Paypal",
        amount: paypalamount,

        payment_status: "paid",
      });

      const usercourse = await UserCourse.create({
        user_id: session?.user?._id,
        course_id: course?._id,
      });

      console.log("orders", orders);
      console.log("usercourse", usercourse);
    } else {
      return NextResponse.json({ err: "payment failed try again" });
    }

    // Respond with success message
    //  console.log("user created => ");
    return NextResponse.json({ success: response.result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
