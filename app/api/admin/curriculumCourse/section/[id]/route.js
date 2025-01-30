
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CurriculumCourse from "@/models/CurriculumCourse";


export async function PUT(req, context) {

  await dbConnect()

  const body = await req.json();

  const  {
    updatedSection,
    search,
  }=body

 //console.log("update section", body)


  try {

   
    const curriculum = await CurriculumCourse.findById(search);

    if (!curriculum) {
      return NextResponse.json({ message: "Section not found" });
    }


    const sectionIndex = curriculum.sections.findIndex(section => section._id.toString() === context?.params?.id.toString());
  

 //console.log( "section index",   sectionIndex )




    if (sectionIndex === -1) {
      return NextResponse.json({ message: "Section not found" });
    }

    curriculum.sections[sectionIndex] = updatedSection;  // Replace section with new data
  
    await curriculum.save();

 //console.log("upadated  curriculum", curriculum)
  return  NextResponse.json(curriculum);


   // return NextResponse.json(curriculum)


  } catch (err) {
  //  console.log("updated error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })
  }



}






export async function DELETE(req, context) {

  await dbConnect()


  const body = await req.json();

  const  {
   
    search
  }=body

 console.log("update section", body)
 console.log("update sectiondelid", context.params.id)


  try {

    const curriculum = await CurriculumCourse.findById(body);

 console.log("curriculum", curriculum)
    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }


    curriculum.sections = curriculum.sections.filter(section => section._id.toString() !== context?.params?.id.toString());
    await curriculum.save();

    console.log("curriculum delete", curriculum)

    return NextResponse.json(curriculum);



   // return NextResponse.json(curriculum)




  } catch (err) {


    return NextResponse.json({ err: err.message }, { status: 500 })




  }



}

