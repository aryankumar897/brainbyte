import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";



export async function POST(req) {
  await dbConnect();

  //console.log("hello")

  const body = await req.json();

 // console.log("section", body);

  const { search, newSection } = body;

  try {
    const curriculum = await Curriculum.findById({ _id: search });

  //  console.log("curriculum", curriculum);

    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }

    const newSectionx = newSection;
    curriculum.sections.push(newSectionx);
       const saved=   await curriculum.save();

// console.log("saved sectio n",saved )


    return NextResponse.json(
     // curriculum
     saved
    );

    //  // const curriculum = await Curriculum.create(body);

    //   const curriculum = await Curriculum.findById(req.params.curriculumId);

    //   const newSection = req.body;
    //   curriculum.sections.push(newSection);
    //   await curriculum.save();
    //   res.status(201).json(curriculum);

    // return NextResponse.json(curriculum)
  } catch (err) {
    //console.log("error", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
