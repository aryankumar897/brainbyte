import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/utils/dbConnect";

import CurriculumCourse from "@/models/CurriculumCourse";

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/utils/authOptions";
import User from "@/models/user";


const stripeInstance = new Stripe(
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

export async function POST(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  try {

    const user = await User.findOne({ _id: session?.user?._id });

    if (!user) {
      return NextResponse.json({ err: "user not found" }, { status: 500 });
    }


    const course = await CurriculumCourse.findOne({
      slug: context.params.id,
    }).sort({
      createdAt: -1,
    });

console.log(course)



    const sessions = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR", // Ensure the currency is INR
            product_data: {
              name: course.title, // Make sure 'leble' is the correct field name for the plan label
            },
            unit_amount: parseFloat(course.price) * 100, // Convert price to smallest currency unit
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url:
        "http://localhost:3000/dashboard/user/stripe/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/dashboard/user/stripe/cancel",
      customer_email: user?.email,
     
      metadata: {
        course_id: course._id.toString(),
      },
    });

    console.log(sessions);

    return NextResponse.json({ id: sessions.url });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

//https://docs.stripe.com/testing#international-cards
