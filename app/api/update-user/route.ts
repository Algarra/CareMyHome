import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { ConnectToDatabase } from "@/utils/mongo";
import { ObjectId } from "mongodb";
import { User } from "@/app/types/user";

const validateUsername = async (username: string) => {
  const { business } = await ConnectToDatabase();

  const user = await business.collection("users").findOne({ username });
  if (user) {
    return false;
  }
  return true;
};

export async function POST(req: NextRequest) {
  try {
    const authToken = req.cookies.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.json({ error: "Wrong auth" }, { status: 401 });
    }
    const body: Partial<User> = await req.json();

    const { description, countryCode, username } = body;

    const AuthTokenValue: any = jwt.verify(
      authToken,
      process.env.USER_ACTION_ACCESS as string
    );

    if (!AuthTokenValue.email) {
      return NextResponse.json({ error: "Wrong auth" }, { status: 401 });
    }

    if (
      username &&
      AuthTokenValue.username !== username &&
      !(await validateUsername(username))
    )
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );

    const { business } = await ConnectToDatabase();
    const filter = { _id: new ObjectId(AuthTokenValue.userId) };
    const update = {
      $set: {
        description,
        countryCode,
        username:
          AuthTokenValue.username !== username
            ? username
            : AuthTokenValue.username,
      },
    };
    const user = await business.collection("users").updateOne(filter, update);

    if (user)
      return new Response(JSON.stringify({ message: "User updated" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
