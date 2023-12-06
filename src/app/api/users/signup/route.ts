import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password}= reqBody;

        console.log("reqbody", reqBody);
        //check if user exists
        const user = await User.findOne({email: email})
        if (user) {
            return NextResponse.json({error:"User already exists", status :400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "New user created",
            success: true,
            status:201,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message, status:500})
    }
}