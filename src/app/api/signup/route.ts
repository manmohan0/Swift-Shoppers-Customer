import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const msg = await req.json()
    
    const response = await new Promise(async resolve => {
        const response = await axios.post("http://localhost:3001/auth/signup", msg, {
            withCredentials: true,
        })
        const data = response.data

        if (data.success && data.reason == "") {
            resolve({ success: true, reason: "" })
        } else if (!data.success && data.reason == "Internal Server Error"){
            resolve({ success: false, reason: "Internal Server Error" })
        } else if (!data.success && data.reason == "Email or Phone No is already in use") {
            resolve({ success: false, reason: "Email or Phone No is already in use" })
        } else if (!data.success && data.reason == "Wrong Format") {
            resolve({ success: false, reason: data.issues[0].message })
        }
    })
        
    return NextResponse.json(response)
}