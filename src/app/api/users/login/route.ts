import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password}= reqBody;

        //check if user exists
        const user = await User.findOne({email: email})
        if (!user) {
            return NextResponse.json({error:"User doesn't exists"}, {status :400})
        }
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        console.log("find user-------", validPassword);

        if (!validPassword){
            return NextResponse.json({error:"Invalid password", status :400})
        }


        const tokenData = {
            id: user._id,
            email: user.email
        }
        const secret = await readFile('./certificate.crt');
        const token = await jwt.sign(tokenData, "SECRETTOKENJWT", {expiresIn: "1h"})

        const resp = NextResponse.json({
            message:"Login successful",
            success: true
        })
        console.log("login response---------------", resp)
       resp.cookies.set("token", token, { httpOnly:true})
       return resp;

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
         
    }
}