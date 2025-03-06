import connect from "@/database/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        message: "User Password Incorrect",
        success: false,
      });
    }
    const tokenBody = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(tokenBody, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "User Login Successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
