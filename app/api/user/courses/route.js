import { NextResponse } from "next/server"

import dbConnect from "@/utils/dbConnect"

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/utils/authOptions"

import UserCourse from "@/models/usercourse"

export async function GET(req, context) {

  await dbConnect()

  const session = await getServerSession(authOptions)

  try {
    const courses = await UserCourse.find({ user_id: session?.user?._id })
    .populate("course_id")



 console.log("coursesxxxxxx",courses)


    return NextResponse.json(courses)

  } catch (error) {

    console.log(error)
    return NextResponse.json({ err: error.message }, { status: 500 })

  }



}


