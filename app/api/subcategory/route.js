import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import SubCategory from "@/models/subcategory";


export async function GET() {

  await dbConnect();

  try {

    const subcategory = await SubCategory.find({}).sort({ createdAt: -1 })

  //console.log("allcatxxxx", subcategory)

    return NextResponse.json(subcategory)




  } catch (err) {
 //console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })


  }

}

