import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { ConnectToDatabase } from "@/utils/mongo";
import { User } from "@/app/types/user";
import type { WithId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get("authToken")?.value;

    if (!authToken) {
      return NextResponse.json({ error: "Wrong auth" }, { status: 401 });
    }

    const AuthTokenDate: any = jwt.verify(
      authToken,
      process.env.USER_ACTION_ACCESS as string
    );

    const { business } = await ConnectToDatabase();

    const user = (await business
      .collection("users")
      .findOne({ email: AuthTokenDate.email })) as WithId<User> | null;

    if (user)
      return new Response(
        JSON.stringify({
          username: user.username,
          email: user.email,
          description: user.description,
          countryCode: user.countryCode,
          userColor: user.userColor,
          image: user.image,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    return NextResponse.json({ error: "Wrong auth" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
