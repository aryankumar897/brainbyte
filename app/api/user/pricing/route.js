
// Import the necessary modules
import { NextResponse } from "next/server";  // Next.js utility to return API responses
import Stripe from "stripe";  // Stripe API for handling payments
import dbConnect from "@/utils/dbConnect";  // Utility function to connect to the MongoDB database
import User from "@/models/user";  // User model to interact with the MongoDB users collection
import { getServerSession } from "next-auth/next";  // NextAuth function to get the session of the current user
import { authOptions } from "@/utils/authOptions";  // Authentication options for NextAuth (to secure the session)

const stripeInstance = new Stripe(
  // Initialize the Stripe instance with the secret key (used for authenticating API requests)
  "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
);

// POST request handler for creating a checkout session
export async function POST(req) {
  await dbConnect();  // Establish a connection to the database

  const body = await req.json();  // Parse the incoming request body as JSON

  const { billingPeriod, price, title } = body;  // Destructure the properties from the request body

  console.log("{billingPeriod,price,title}", { billingPeriod, price, title });  // Log the received data for debugging purposes

  const sessions = await getServerSession(authOptions);  // Get the session to verify if the user is authenticated

  // Parse the price to extract the integer value (removes any non-numeric characters)
  const str = price;
  const integerOnly = str && parseInt(str.match(/\d+/)[0], 10);  // Match and parse the first number from the price string

  try {
    // Find the user from the database based on the user ID from the session
    const user = await User.findOne({ _id: sessions?.user?._id });

    // If no user is found, return an error response
    if (!user) {
      return NextResponse.json({ err: "user not found" }, { status: 500 });
    }

    // Create a new Stripe checkout session for the payment
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],  // Allow card payments
      line_items: [
        {
          price_data: {
            currency: "INR",  // Set the currency for the transaction
            product_data: {
              name: `${billingPeriod} Subscription`,  // Product name based on the billing period (e.g., "Monthly Subscription")
            },
            unit_amount: integerOnly * 100,  // The amount in the smallest currency unit (e.g., paise for INR)
          },

          quantity: 1,  // Set the quantity of the item (1 in this case, since it's a single subscription)
        },
      ],
      mode: "payment",  // Set the mode to "payment" for one-time payments
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,  // Redirect URL on successful payment
      cancel_url: `${process.env.CLIENT_URL}/cancel`,  // Redirect URL on canceled payment
      customer_email: user?.email,  // Send the email of the user (for Stripe to associate the payment with the user)

      metadata: {
        userId: user?._id.toString(),  // Store the user ID in the metadata for later use
        billing: billingPeriod,  // Store the billing period (e.g., "monthly" or "yearly")
        title: title,  // Store the title of the subscription (for context)
      },
    });

    console.log("session===========", session);  // Log the Stripe session object for debugging

    // Return the Stripe checkout session URL to redirect the user to Stripe for payment
    return NextResponse.json({ id: session.url });

  } catch (error) {
    console.log("error ", error);  // Log any error that occurs during the process

    // Return an error response with the error message if something goes wrong
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}




































// import { NextResponse } from "next/server";

// import Stripe from "stripe";
// import dbConnect from "@/utils/dbConnect";
// import User from "@/models/user";

// import { getServerSession } from "next-auth/next";

// import { authOptions } from "@/utils/authOptions";

// const stripeInstance = new Stripe(
//   "sk_test_51K5nvYSGgs9C5RdZpIIhINkUXAcMb46wbwGbJiGGWlt2VXjXhjP6wQerucW9lc3AUDCoMZ3ArV3zLIMxCQRSI24100pNDDDSew"
// );

// export async function POST(req) {
//   await dbConnect();

//   const body = await req.json();

//   const { billingPeriod, price, title } = body;

//   console.log("{billingPeriod,price,title}", { billingPeriod, price, title });

//   const sessions = await getServerSession(authOptions);

//   const str = price;
//   const integerOnly = str && parseInt(str.match(/\d+/)[0], 10);

//   try {
//     const user = await User.findOne({ _id: sessions?.user?._id });

//     if (!user) {
//       return NextResponse.json({ err: "user not found" }, { status: 500 });
//     }

//     const session = await stripeInstance.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: `${billingPeriod} Subscription`,
//             },
//             unit_amount: integerOnly * 100,
//           },

//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//       customer_email: user?.email,

//       metadata: {
//         userId: user?._id.toString(),
//         billing: billingPeriod,
//         title: title,
//       },
//     });

//     console.log("session===========", session);

//     return NextResponse.json({ id: session.url });
//   } catch (error) {
//     console.log("error ", error);

//     return NextResponse.json({ err: error.message }, { status: 500 });
//   }
// }
