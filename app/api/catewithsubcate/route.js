import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CateWithSubCate from "@/models/catewithsubcate";


export async function GET() {
  await dbConnect();
  try {
    const cateWithSubCate = await CateWithSubCate.find({})
    .sort({ createdAt: -1 })
      .populate("categoryId")
      .populate("subcategoryId")

    console.log("cateWithSubCate===============", cateWithSubCate)
    return NextResponse.json(cateWithSubCate)
  } catch (err) {
   // console.log("error", err)
    return NextResponse.json({ err: err.message }, { status: 500 })

  }

}
