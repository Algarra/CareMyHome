import { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../../app/types/user";
import { ConnectToDatabase } from "@/utils/mongo";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
    }: {
      user: { email: string; name: string; image: string };
    }) {
      const { business } = await ConnectToDatabase();
      const existingUser = await business
        .collection("users")
        .findOne({ email: user.email });

      if (!existingUser) {
        await business.collection("users").insertOne({
          email: user.email,
          username: user.name,
          countryCode: "US",
          loginMethod: "google",
          image: {
            blurHash: "LPFiAB~VN{x]?^.8%LxuOs?v%Lt6",
            url: user.image,
          },
          createdAt: new Date().getTime(),
        } as User);
      }
      const newUser = await business
        .collection("users")
        .findOne({ email: user.email });
      if (!newUser) return false;

      const cookie = await cookies();

      const authToken = jwt.sign(
        {
          userId: newUser._id.toString(),
          username: newUser.username,
          email: newUser.email,
        },
        process.env.USER_ACTION_ACCESS as string
      );

      cookie.set("authToken", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return true;
    },
    async session({ session }: any) {
      if (!session.user?.email) return session; // Ensure user email exists
      const { business } = await ConnectToDatabase();
      const dbUser = await business
        .collection("users")
        .findOne({ email: session.user?.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString(); // Ensure it's a string
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
