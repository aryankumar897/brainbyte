

import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Curriculum from "@/models/Curriculum";


export async function POST(req, context) {
  await dbConnect()
  const body = await req.json();
  const  {
    sections,
    search,
  }=body

 //console.log("update section", body)

  try {

   
    const curriculum = await Curriculum.findById(search);

    if (!curriculum) {
      return NextResponse.json({ message: "curriculum  not found" });
    }


  // Update sections array in the curriculum document
  await Curriculum.updateOne(
    { _id: search },
    { $set: { sections } }
  );

   //console.log({ message: "Section order lacture updated successfully." })

  
  return  NextResponse.json(curriculum);


   // return NextResponse.json(curriculum)


  } catch (err) {
 //console.log("updated error lacture order", err)
    return NextResponse.json({ err: err.message }, { status: 500 })
  }



}

