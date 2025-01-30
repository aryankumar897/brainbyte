
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CourseOrder from "@/models/courseorder";

export async function GET() {

  await dbConnect();
 
  try {

    const order = await CourseOrder.find({})
    .sort({ createdAt: -1 })
   
    return NextResponse.json(order)

  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

