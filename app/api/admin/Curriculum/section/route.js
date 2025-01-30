

// Importing the NextResponse module from Next.js to handle HTTP responses
import { NextResponse } from "next/server";

// Importing a custom utility function to connect to the MongoDB database
import dbConnect from "@/utils/dbConnect";

// Importing the Curriculum model schema to interact with the 'Curriculum' collection in MongoDB
import Curriculum from "@/models/Curriculum";

// Async function to handle the POST request for adding a new section to an existing curriculum
export async function POST(req) {
  // Connect to the MongoDB database
  await dbConnect();

  // Parsing the incoming JSON body from the request
  const body = await req.json();

  // Extracting the 'search' and 'newSection' properties from the request body
  const { search, newSection } = body;

  try {
    // Searching for the curriculum by its ID (the 'search' parameter)
    const curriculum = await Curriculum.findById({ _id: search });

    // If no curriculum is found, return an error response
    if (!curriculum) {
      return NextResponse.json({ err: "not found" });
    }

    // Assigning the new section to a variable
    const newSectionx = newSection;

    // Pushing the new section to the curriculum's sections array
    curriculum.sections.push(newSectionx);

    // Saving the updated curriculum back to the database
    const saved = await curriculum.save();

    // Getting the newly added section (the last one in the array)
    const newlyAddedSection = curriculum.sections[curriculum.sections.length - 1];

    // Returning the newly added section as a JSON response
    return NextResponse.json({ newlyAddedSection });

  } catch (err) {
    // If an error occurs during the process, returning an error response with status 500 and the error message
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}





































// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";

// export async function POST(req) {
//   await dbConnect();

//   //console.log("hello")

//   const body = await req.json();

//   // console.log("section", body);

//   const { search, newSection } = body;

//   try {
//     const curriculum = await Curriculum.findById({ _id: search });



//     if (!curriculum) {
//       return NextResponse.json({ err: "not found" });
//     }

//     const newSectionx = newSection;
//     curriculum.sections.push(newSectionx);
//     const saved = await curriculum.save();

  

//     const newlyAddedSection =
//       curriculum.sections[curriculum.sections.length - 1];

//     return NextResponse.json({ newlyAddedSection });

   

  
//   } catch (err) {
//     //console.log("error", err);
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }




// real  code comment 




// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";
// import Curriculum from "@/models/Curriculum";

// export async function POST(req) {
//   await dbConnect();

//   //console.log("hello")

//   const body = await req.json();

//   // console.log("section", body);

//   const { search, newSection } = body;

//   try {
//     const curriculum = await Curriculum.findById({ _id: search });

//     //  console.log("curriculum", curriculum);

//     if (!curriculum) {
//       return NextResponse.json({ err: "not found" });
//     }

//     const newSectionx = newSection;
//     curriculum.sections.push(newSectionx);
//     const saved = await curriculum.save();

//     // console.log("saved sectio n",saved )

//     const newlyAddedSection =
//       curriculum.sections[curriculum.sections.length - 1];

//     //console.log("newlyAddedSection",newlyAddedSection)
//     return NextResponse.json({ newlyAddedSection });

//     // return NextResponse.json(
//     //  // curriculum
//     //  saved
//     // );

//     //  // const curriculum = await Curriculum.create(body);

//     //   const curriculum = await Curriculum.findById(req.params.curriculumId);

//     //   const newSection = req.body;
//     //   curriculum.sections.push(newSection);
//     //   await curriculum.save();
//     //   res.status(201).json(curriculum);

//     // return NextResponse.json(curriculum)
//   } catch (err) {
//     //console.log("error", err);
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
