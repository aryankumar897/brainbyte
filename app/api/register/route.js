import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";
import fetch from 'node-fetch';



// verifyRecaptcha function with retry mechanism and proper error handling
const verifyRecaptcha = async (token, retries = 3) => {
    const secretKey = '6LevkGgbAAAAANz5VCkNLtxc1QQnz77J08QA5kU1';
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const params = `secret=${secretKey}&response=${token}`;

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });
            const data = await response.json();

             console.log("datax",data)
            if (data.success) {
                return true;
            } else {
                console.log(`reCAPTCHA verification failed: ${data['error-codes']}`);
                return false;
            }
        } catch (error) {
            console.log(`Attempt ${attempt + 1} failed: ${error.message}`);
            if (attempt === retries - 1) {
                throw new Error('All reCAPTCHA verification attempts failed');
            }
        }
    }
};





export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    const { name, email, password, recaptchaToken ,  organization} = body;
    console.log({ name, email, password, recaptchaToken, organization });

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          
            return NextResponse.json({ err: 'Email already in use' }, { status: 500 });
      
      
        }


        const isHuman = await verifyRecaptcha(recaptchaToken);
        if (!isHuman) {
            console.log("reCAPTCHA verification failed");
            return NextResponse.json({ err: 'reCAPTCHA verification failed. Please try again.' });
        }
        // Generate activation token
      
        console.log("reCAPTCHA verification ");

      
        const hashedPassword = await bcrypt.hash(password, 10);
      

        const user = await new User({
           name, email,
            password: hashedPassword ,

            organization




        }).save();






       // console.log("user saved successfully", user);

      return NextResponse.json({ msg: "User registered  successfully" });
       
    } catch (err) {
        console.log(err);
        return NextResponse.json({ err: err.message }, { status: 500 });

    }
}