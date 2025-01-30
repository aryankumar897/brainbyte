import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CurriculumCourse from "@/models/CurriculumCourse";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const { search, newSection } = body;

 //console.log({  search, newSection })


  try {
    const curriculum = await CurriculumCourse.findById({ _id: search });

    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }

    const newSectionx = newSection;
    curriculum.sections.push(newSectionx);

   // console.log({  search, newSection } ,curriculum    )


    const saved=   await curriculum.save();

 // Get the newly added section
 const newlyAddedSection = curriculum.sections[curriculum.sections.length - 1];

  //console.log("newlyAddedSection",newlyAddedSection)
    return NextResponse.json({ newlyAddedSection });
    
  } catch (err) {
   // console.log("error saving course section  ", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
