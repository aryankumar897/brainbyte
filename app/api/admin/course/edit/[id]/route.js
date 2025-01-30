
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CurriculumCourse from "@/models/CurriculumCourse";


export async function GET(req, context) {

  await dbConnect()


//console.log("course eedit page",context?.params?.id )



  
  try {

    const curriculumCourse = await CurriculumCourse.findOne(
     {
      _id: context?.params?.id
     }
   
      );



    return NextResponse.json(curriculumCourse)


  } catch (err) {
 //console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })
  }



}


