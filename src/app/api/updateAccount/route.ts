import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../getUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function POST(req: NextRequest) {
    const newDetails = await req.json();
    const user = await getUser();

    const response = await new Promise(async resolve => {

        const response = await axios.post("http://localhost:3001/user/updateAccount", { newDetails, user }, {
            withCredentials: true,
        })
        const data = response.data

        if (!data.success && data.reason == "Internal Server Error") {
            resolve({ success: false, reason: "Internal Server Error" })
        } else if (!data.success && data.reason == "Wrong Format") {
            resolve({ success: false, reason: data.issues[0].message })
        } else if (data.success && data.reason == "Name Updated Successfully") {
            resolve({ success: true, profileData: "Name" })
        } else if (data.success && data.reason == "Email Updated Successfully") {
            resolve({ success: true, profileData: "Email" })
        } else if (data.success && data.reason == "Phone No Updated Successfully") {
            resolve({ success: true, profileData: "Phone No" })
        }

        if (data.success) {
            const Cookies = await cookies()
            const token = jwt.sign(data.user, process.env.SECRET_KEY ?? "")
            Cookies.set("token", token)
        }
            
    })

    return NextResponse.json(response)
}