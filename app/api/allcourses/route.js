
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";



export async function GET() {

  await dbConnect();

  try {

    const curriculums = await CurriculumCourse.find({})
    .sort({ createdAt: -1 })
   

    return NextResponse.json(curriculums)


  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

