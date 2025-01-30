import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Curriculum from "@/models/Curriculum";
import slugify from "slugify"; // Import slugify
export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();

  //console.log("body", body);
  const { updatedSection, sectionId, search } = body;

 // console.log("req", context.params.id);
 //console.log("updated section", updatedSection )

  //console.log("bodyvvvvvvvvvvvvvv");



  try {
   // const { updatedSection, sectionId, search } = body;

    const curriculum = await Curriculum.findById(search);

    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }

    const section = curriculum?.sections.id(sectionId);

    if (section === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    const lectureIndex = section?.lectures.findIndex(
      (lecture) => lecture._id.toString() === context?.params?.id.toString()
    );

    if (lectureIndex === -1) {
      return res.status(404).json({ message: "Lecture not found" });
    }


 // Generate a slug from the title in updatedSection
 const slug = slugify(updatedSection?.title
  
);

// Add the slug to updatedSection
updatedSection.slug = slug;




    section.lectures[lectureIndex] = updatedSection; // Replace lecture with new data
   
   
   
    await curriculum.save();

   // console.log("updated lacture", curriculum);

    return NextResponse.json(curriculum);

    // return NextResponse.json(curriculum)
  } catch (err) {
   // console.log("errx ", err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  const body = await req.json();

 // console.log("body", context?.params?.id);
 // console.log("deleting..", body);



  try {


    const {

      sectionId,
      search,
    }=body




    const curriculum = await Curriculum.findById(search);
   
    if (!curriculum) {
      return NextResponse.json({ message: "curriculum not found" });
    }


    const section = curriculum.sections.id(sectionId);
   
    if (!section) {
      return NextResponse.json({ message: "section not found" });
    }

    section.lectures = section.lectures.filter(
      (lecture) => lecture._id.toString() !== context?.params?.id.toString()
    );


    await curriculum.save();
   // console.log("curriculum",curriculum)

   return NextResponse.json(curriculum)
  } catch (err) {


    // console.log("err",err)


    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
