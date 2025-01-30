
// Import authentication providers from NextAuth for handling different login methods
import CredentialsProvider from "next-auth/providers/credentials"; // Email/password authentication
import GoogleProvider from "next-auth/providers/google"; // Google authentication
import GitHubProvider from "next-auth/providers/github"; // GitHub authentication
import FacebookProvider from "next-auth/providers/facebook"; // Facebook authentication (commented out)

// Importing the User model to interact with the database
import User from "@/models/user";

// Import bcrypt for password hashing and verification
import bcrypt from "bcrypt";

// Import database connection utility
import dbConnect from "@/utils/dbConnect";

// Define authentication options for NextAuth
export const authOptions = {
  // Define session strategy to use JWT (JSON Web Token) instead of database sessions
  session: {
    strategy: "jwt",
  },

  // Configure authentication providers
  providers: [
    // Email/password authentication
    CredentialsProvider({
      async authorize(credentials, req) {
        // Connect to the database before querying user data
        await dbConnect();

        // Extract email and password from credentials
        const { email, password } = credentials;

        // Find user by email in the database
        const user = await User.findOne({ email });

        // If user exists but has no password (e.g., registered via Google), deny login
        if (!user?.password) {
          throw new Error("Please login via the method used to sign up");
        }

        // Compare entered password with hashed password stored in the database
        const isPasswordValid =
          user && (await bcrypt.compare(password, user.password));

        // If password is incorrect, throw an error
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Return user data if authentication is successful
        return user;
      },
    }),

    // Google authentication provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google Client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret
    }),

    // GitHub authentication provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID, // GitHub Client ID from environment variables
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // GitHub Client Secret
    }),

    // Facebook authentication provider (currently commented out)
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),

    // LinkedIn authentication provider (also commented out)
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    // })
  ],

  // Define custom callback functions for NextAuth
  callbacks: {
    // Callback when a user signs in
    async signIn({ user }) {
      // Connect to the database
      await dbConnect();

      // Extract email from the authenticated user
      const { email } = user;

      // Try to find an existing user with the provided email
      let dbUser = await User.findOne({ email: email });

      // If the user does not exist in the database, create a new user record
      if (!dbUser) {
        dbUser = await User.create({
          email,
          name: user?.name, // Store the user's name
          image: user?.image, // Store the user's profile image
        });
      }

      return true; // Allow login
    },

    // Callback to modify JWT token before it's sent to the client
    jwt: async ({ token }) => {
      // Find user by email in the database
      const userByEmail = await User.findOne({ email: token.email });

      // If the user exists, remove the password field for security reasons
      if (userByEmail) {
        userByEmail.password = undefined; // Exclude sensitive fields

        // Add user data and role to the token object
        token.user = {
          ...userByEmail.toObject(),
          role: userByEmail.role || "user", // Assign a default role if none exists
        };
      }

      return token; // Return updated token
    },

    // Callback to modify the session object before it's sent to the client
    session: async ({ session, token }) => {
      console.log("session", session);

      // Attach user details (including role) from the token to the session object
      session.user = {
        ...token.user,
        role: token.user.role || "user", // Ensure role is always included
      };

      return session; // Return updated session
    },
  },

  // Secret key for securing authentication tokens
  secret: process.env.NEXTAUTH_SECRET,

  // Define custom pages for authentication (e.g., custom login page)
  pages: {
    signIn: "/login", // Redirect users to the login page
  },
};









































// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// import GitHubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook";

// import User from "@/models/user";

// import bcrypt from "bcrypt";

// import dbConnect from "@/utils/dbConnect";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       async authorize(credentials, req) {
//         await dbConnect();
//         const { email, password } = credentials;

//         const user = await User.findOne({ email });

//         if (!user?.password) {
//           throw new Error("please  login via  the method used to  sign up");
//         }

//         const isPasswordValid =
//           user && (await bcrypt.compare(password, user.password));

//         if (!isPasswordValid) {
//           throw new Error("Invalid email or password");
//         }

//         return user;
//       },
//     }),

//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         GitHubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET
//         }),



//     //    FacebookProvider({
//     //        clientId: process.env.FACEBOOK_CLIENT_ID,
//     //        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//     //     }),
//     //     LinkedInProvider({
//     //         clientId: process.env.LINKEDIN_CLIENT_ID,
//     //         clientSecret: process.env.LINKEDIN_CLIENT_SECRET
//     //       })
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       await dbConnect();
//      // console.log("user", user);
//       const { email } = user;

//  //console.log("user sosical", user)

//       //try to find  a user  with  the  provided email

//       let dbUser = await User.findOne({ email: email });
//       //if the user is not found

//       if (!dbUser) {
//         dbUser = await User.create({
//           email,
//           name: user?.name,
//           image:user?.image,
          
//         });
//       }

//       return true;
//     },

//     jwt: async ({ token }) => {
     
//       const userByEmail = await User.findOne({ email: token.email });

//       if (userByEmail) {
//         userByEmail.password = undefined; // Exclude sensitive fields
//         token.user = {
//           ...userByEmail.toObject(),
//           role: userByEmail.role || "user", // Default role fallback
//         };
//       }

//       return token;
//     },

//     session: async ({ session, token }) => {
//       console.log("session", session);
//       session.user = {
//         ...token.user,
//         role: token.user.role || "user", // Ensure role is always included
//       };
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };
