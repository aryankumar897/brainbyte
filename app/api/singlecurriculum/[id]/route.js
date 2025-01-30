
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";



export async function GET(req,context) {

  await dbConnect();

  try {

    const curriculums = await Curriculum.findOne({_id:context?.params?.id})

   //  console.log("single request",curriculums)
    return NextResponse.json(curriculums)


  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

