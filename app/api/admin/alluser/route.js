
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import User from  "@/models/user"
import slugify from 'slugify'

export async function GET() {

  await dbConnect();

  try {

    const user = await User.find({}).sort({ createdAt: -1 })

   

    return NextResponse.json(user)




  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

