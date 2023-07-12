import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  // next authentication -> google
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {

      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    
    async signIn ({ profile }) {
      try {
        // serverless -> lambda function -> dynamodb
        await connectToDB();
        // check to see if user already exists
        const userExists = await User.findOne({
          email: profile.email
        });

        // if no user found -> create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          })
        }
        // check if user already exists
        // if not, create new user and save to DB
        // return true;
        return profile;
      } catch (error) {
        console.log("Error signing in: ", error);
        return false, {error: 'failed to sign in'};
      }
    }
  },
  pages: {
    error({error}) {
      return <div>{error}</div>
    }
  }
})

export const GET = handler;
export const POST = handler;