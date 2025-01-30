import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import User from "@/models/user";

import bcrypt from "bcrypt";

import dbConnect from "@/utils/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user?.password) {
          throw new Error("please  login via  the method used to  sign up");
        }

        const isPasswordValid =
          user && (await bcrypt.compare(password, user.password));

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),



    //    FacebookProvider({
    //        clientId: process.env.FACEBOOK_CLIENT_ID,
    //        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    //     }),
    //     LinkedInProvider({
    //         clientId: process.env.LINKEDIN_CLIENT_ID,
    //         clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    //       })
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect();
     // console.log("user", user);
      const { email } = user;

 //console.log("user sosical", user)

      //try to find  a user  with  the  provided email

      let dbUser = await User.findOne({ email: email });
      //if the user is not found

      if (!dbUser) {
        dbUser = await User.create({
          email,
          name: user?.name,
          image:user?.image,
          
        });
      }

      return true;
    },

    jwt: async ({ token }) => {
     
      const userByEmail = await User.findOne({ email: token.email });

      if (userByEmail) {
        userByEmail.password = undefined; // Exclude sensitive fields
        token.user = {
          ...userByEmail.toObject(),
          role: userByEmail.role || "user", // Default role fallback
        };
      }

      return token;
    },

    session: async ({ session, token }) => {
      console.log("session", session);
      session.user = {
        ...token.user,
        role: token.user.role || "user", // Ensure role is always included
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
