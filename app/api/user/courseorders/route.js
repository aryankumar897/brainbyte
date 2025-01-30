
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import CourseOrder from "@/models/courseorder";

export async function GET() {




  await dbConnect();
  const session = await getServerSession(authOptions);
  try {

    const order = await CourseOrder.find({ user_id:session?.user?._id})
    .sort({ createdAt: -1 })
   

    return NextResponse.json(order)


  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

