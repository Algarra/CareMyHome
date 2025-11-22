import { ConnectToDatabase } from "@/utils/mongo";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { validateEmail, validateUsername } from "@/app/_actions";
import { validatePassword } from "@/app/utils/passwordValidator";
import { sendWelcomeEmail } from "@/app/utils/email-manager";
import { User, UserColor } from "../../types/user";

function getRandomUserColor(): UserColor {
  const colors = Object.values(UserColor); // ["red", "orange", "amber", ...]
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password, username } = body;
    const countryCode = request.headers.get("x-vercel-ip-country") || "US";

    const { business } = await ConnectToDatabase();

    const user = await business.collection("users").findOne({ email });

    if (user)
      return new Response(JSON.stringify({ error: "User already exist" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    if (!(await validateUsername(username)))
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    if (!validateEmail(email))
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    if (!validatePassword(password))
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    await business.collection("users").insertOne({
      email,
      password: hashedPassword,
      username,
      countryCode,
      userColor: getRandomUserColor(),
    } as User);

    const newUser = await business.collection("users").findOne({ username });

    if (!newUser)
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });

    sendWelcomeEmail({
      email: newUser.email,
      username: newUser.username,
    });

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

    return new Response(JSON.stringify({ message: "user created" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ ~ create-user ~ error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
