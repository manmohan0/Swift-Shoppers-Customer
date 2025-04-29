import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: NextRequest) {
    const msg = await req.json()
            
        const response = await new Promise(async resolve => {
            
            const response = await axios.post("http://localhost:3001/auth/signin", msg, {
                withCredentials: true,
            })
            const data = response.data
            
            if (data.success && data.reason == "") {
                const Cookies = await cookies()
                const token = data.token
                Cookies.set("token", token)
                resolve({ success: true, reason: "" })
            } else if (!data.success && data.reason == "Internal Server Error") {
                resolve({ success: false, reason: "Internal Server Error" })
            } else if (!data.success && data.reason == "User Not Found") {
                resolve({ success: false, reason: "User does not exist" })
            } else if (!data.success && data.reason == "Incorrect Password") {
                resolve({ success: false, reason: "Incorrect Password"})
            } else if (!data.success && data.reason == "Wrong Format") {
                resolve({ success: false, reason: "Wrong Format", issue: data.issues[0].message })
            }
        })
        
    return NextResponse.json(response)
}