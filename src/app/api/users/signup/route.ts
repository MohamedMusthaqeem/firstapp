import connect from "@/database/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    console.log("reqBody", reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    console.log(user);
    //hashing  the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log("hashedPassword", hashedPassword);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("Saved User", savedUser);
    return NextResponse.json({
      message: "User saved successfully",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
