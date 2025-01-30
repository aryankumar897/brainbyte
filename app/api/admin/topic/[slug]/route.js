
// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Curriculum from "@/models/Curriculum";


// export async function GET(req, context) {

//   await dbConnect()
//    console.log("context?.params?.slug",context?.params?.slug)

//   try {

//     const curriculum = await Curriculum.find({slug:context?.params?.slug});

//  console.log("get method" ,curriculum)

//     return NextResponse.json(curriculum)


//   } catch (err) {
//     console.log("get method err" ,err)

//     return NextResponse.json({ err: err.message }, { status: 500 })
//   }



// }







import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";

export async function GET(req, context) {
  await dbConnect();

  const slugdata = context?.params?.slug;
  const slug = slugdata?.toLowerCase();
  //console.log("slugggg", slug);

  if (!slug) {
    return NextResponse.json({ message: "Lecture slug is required." }, { status: 400 });
  }

  try {
    // Query to find the curriculum containing the lecture with the given slug
    let curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug,
    });

    if (!curriculum) {
      // If no specific lecture is found, try fetching by curriculum slug
      curriculum = await Curriculum.findOne({
        "slug": slug,
      });

      if (!curriculum) {
        return NextResponse.json({ message: "Curriculum or lecture not found." }, { status: 404 });
      }

      console.log("Matching Lecture inside   : ", curriculum);

      return NextResponse.json(curriculum);
    }

   


   console.log("Matching Lecture out side: ", curriculum);
    return NextResponse.json(curriculum);
  } catch (err) {
    //console.error("Error fetching lecture:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}




