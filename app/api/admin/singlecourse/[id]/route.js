
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";




export async function GET(req,context) {

  await dbConnect();
  //console.log("single request course===================-==============================")
  try {

    const curriculums = await CurriculumCourse.findOne({_id:context?.params?.id})

  //console.log("single request course",curriculums)
    return NextResponse.json(curriculums)


  } catch (err) {
   // console.log("single request course error",err)
    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

