
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import SubCategory from "@/models/subcategory";


export async function PUT(req, context) {

  await dbConnect()

  const body = await req.json();
  try {

    // console.log( "xx",  body);
    //    console.log("xx", context.params.id);
    const {  ...updateBody } = body;
    const updatingSubCategory = await SubCategory.findByIdAndUpdate(

      context.params.id,
      updateBody,
      { new: true }

    )


    return NextResponse.json(updatingSubCategory)


  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })
  }



}






export async function DELETE(req, context) {

  await dbConnect()

  try {

    const deletingSubCategory = await SubCategory.findByIdAndDelete(
      context.params.id

    )


    return NextResponse.json(deletingSubCategory)




  } catch (err) {


    return NextResponse.json({ err: err.message }, { status: 500 })




  }



}

