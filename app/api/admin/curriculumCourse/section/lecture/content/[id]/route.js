import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CurriculumCourse from "@/models/CurriculumCourse";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();

 // console.log("body", body);
 // console.log("req", context.params.id);

  try {
    const { lacturebody,
        sectionId,
        search, } = body;

    const curriculum = await CurriculumCourse.findById(search);

    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    const section = curriculum.sections.id(sectionId);

    if (section === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    const lectureIndex = section.lectures.findIndex(
      (lecture) => lecture._id.toString() === context.params.id.toString()
    );

    if (lectureIndex === -1) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    section.lectures[lectureIndex] = lacturebody; // Replace lecture with new data
    await curriculum.save();

//console.log("updated lacture content", curriculum);

    return NextResponse.json(curriculum);

    // return NextResponse.json(curriculum)
  } catch (err) {
    //console.log("errx ", err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
