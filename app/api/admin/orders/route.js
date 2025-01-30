import { NextResponse } from "next/server"


import dbConnect from "@/utils/dbConnect"


import Order from "@/models/order"

export async function GET(req, context) {

  await dbConnect()

 
  try {
    const order = await Order.find({  })

    return NextResponse.json(order)

  } catch (error) {

   // console.log(error)
    return NextResponse.json({ err: error.message }, { status: 500 })

  }



}


