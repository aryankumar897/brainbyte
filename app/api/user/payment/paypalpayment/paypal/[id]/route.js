



// Importing necessary modules
import { NextResponse } from "next/server"; // Next.js API handler for responses
import dbConnect from "@/utils/dbConnect"; // Import utility to connect to the database
import paypal from '@paypal/checkout-server-sdk'; // Import PayPal SDK for handling PayPal transactions
import CurriculumCourse from "@/models/CurriculumCourse"; // Import the CurriculumCourse model for course data

// Set up PayPal environment with client ID and secret (sandbox mode for testing)
let environment = new paypal.core.SandboxEnvironment(
  "AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL", // PayPal client ID (Sandbox)
  "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0" // PayPal client secret (Sandbox)
);

// Create PayPal client to interact with the PayPal API
let client = new paypal.core.PayPalHttpClient(environment);

// The main GET function to create a PayPal order
export async function GET(req, context) {
  // Establish a database connection
  await dbConnect();

  try {
    // Fetch course data based on the slug parameter from the URL (context.params.id)
    const course = await CurriculumCourse.findOne({ slug: context.params.id }).sort({ createdAt: -1 });

    // Set up the PayPal order creation request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation"); // Indicate that the API should return a representation of the order

    // Define the request body for the PayPal order creation
    request.requestBody({
      application_context: {
        // Redirect URLs for successful and canceled payments
        return_url: 'http://localhost:3000/dashboard/user/paypal/success', 
        cancel_url: 'http://localhost:3000/dashboard/user/paypal/cancel',
      },
      intent: 'CAPTURE', // Intent to capture the payment after approval
      purchase_units: [{
        // Associate the course with the PayPal order using reference ID
        reference_id: course && course?._id, 
        amount: {
          currency_code: 'USD', // Set the currency as USD
          value: course && course?.price, // Set the course price
        },
      }]
    });

    // Execute the PayPal order creation request
    const order = await client.execute(request);
    console.log('order===>', order.result.links); // Log the PayPal order response links for debugging

    // Return the approval URL (second link) from the PayPal order response to the client
    return NextResponse.json({ id: order?.result.links[1].href });
  } catch (err) {
    // Catch any errors and return a 500 error response with the error message
    console.log("err=>", err);
    return NextResponse.json(err.message, { status: 500 });
  }
}















































// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbConnect";


// import paypal from '@paypal/checkout-server-sdk';

// import CurriculumCourse from "@/models/CurriculumCourse";


// let environment = new paypal.core.SandboxEnvironment("AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL",
//     "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0"
// );
// let client = new paypal.core.PayPalHttpClient(environment);





// export async function GET(req, context) {
//     await dbConnect();
//     try {

//         // console.log("hello", context.params.id)

//         const  course = await CurriculumCourse.findOne({ slug: context.params.id }).sort({ createdAt: -1 });
//         // console.log("planxx", plan)
//         // console.log("planxx", plan._id)
//         // console.log("planxx", plan.price)





//         const request = new paypal.orders.OrdersCreateRequest();
//         request.prefer("return=representation");
//         request.requestBody({
//             application_context: {
//                 return_url: 'http://localhost:3000/dashboard/user/paypal/success',
//                 cancel_url: 'http://localhost:3000/dashboard/user/paypal/cancel',
//             },



//             intent: 'CAPTURE',
//             purchase_units: [{
//                 reference_id: course && course?._id,
//                 amount: {
//                     currency_code: 'USD',
//                     value: course && course?.price
//                 },

//             }]
//         });






//         const order = await client.execute(request);
//         //  res.json({ id: order.result.id });
//         console.log('order===>', order.result.links)
//         return NextResponse.json({ id: order?.result.links[1].href });
//     } catch (err) {
//         console.log("err=>", err)
//         return NextResponse.json(err.message, { status: 500 });
//     }
// }

// //sb-drhne26200129@personal.example.com