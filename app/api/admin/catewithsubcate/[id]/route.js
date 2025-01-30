
import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";


import CateWithSubCate from  "@/models/catewithsubcate";


export async function PUT(req, context) {

  await dbConnect()

  const body = await req.json();


  try {

    


    const updatingCategory = await CateWithSubCate.findByIdAndUpdate(

      context.params.id,
      body,
      { new: true }

    )
//console.log("updating categoryx" , updatingCategory)

    return NextResponse.json(updatingCategory)


  } catch (err) {
 //console.log(err)
    return NextResponse.json({ err: err.message }, { status: 500 })
  }



}






export async function DELETE(req, context) {

  await dbConnect()

  try {

    const deletingCategory = await CateWithSubCate.findByIdAndDelete(
      context.params.id

    )


    return NextResponse.json(deletingCategory)




  } catch (err) {


    return NextResponse.json({ err: err.message }, { status: 500 })




  }



}

