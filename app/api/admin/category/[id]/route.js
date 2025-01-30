
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";


export async function PUT(req, context) {

  await dbConnect()

  const body = await req.json();
  try {

    // console.log( "xx",  body);
    //    console.log("xx", context.params.id);
    const { _id, ...updateBody } = body;
    const updatingCategory = await Category.findByIdAndUpdate(

      context.params.id,
      updateBody,
      { new: true }

    )


    return NextResponse.json(updatingCategory)


  } catch (err) {

    return NextResponse.json({ err: err.message }, { status: 500 })
  }



}






export async function DELETE(req, context) {

  await dbConnect()

  try {

    const deletingCategory = await Category.findByIdAndDelete(
      context.params.id

    )


    return NextResponse.json(deletingCategory)




  } catch (err) {


    return NextResponse.json({ err: err.message }, { status: 500 })




  }



}

