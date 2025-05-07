import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../getUser";
import { cookies } from "next/headers";
import { connectRedis } from "@/config/redis";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function POST(req: NextRequest) {
    const newDetails = await req.json();
    const user = await getUser();

    const response = await new Promise(async resolve => {

        const response = await axios.post("http://localhost:3002/user/updateAccount", { newDetails, user }, {
            withCredentials: true,
        })
        const data = response.data
                
        if (!data.success && data.reason == "Internal Server Error") {
            resolve({ success: false, reason: "Internal Server Error" })
        } else if (!data.success && data.reason == "Wrong Format") {
            resolve({ success: false, reason: data.issues[0].message })
        } else if (data.success && data.reason == "Name Updated Successfully") {
            const redisClient = await connectRedis()
            if (!redisClient) return resolve({ success: false, reason: "Redis Client not connected" })
            
            const Cookies = await cookies()    
    
            const token = jwt.sign(data.user, process.env.SECRET_KEY ?? "")
            Cookies.set("token", token)   
            await redisClient.set("token", token, { "EX" : 60 * 60 * 24 * 7 });

            resolve({ success: true, profileData: "Name" })
        } else if (data.success && data.reason == "Email Updated Successfully") {
            const redisClient = await connectRedis()
            if (!redisClient) return resolve({ success: false, reason: "Redis Client not connected" })
            
            const Cookies = await cookies()    
    
            const token = jwt.sign(data.user, process.env.SECRET_KEY ?? "")
            Cookies.set("token", token)   
            await redisClient.set("token", token, { "EX" : 60 * 60 * 24 * 7 });

            resolve({ success: true, profileData: "Email" })
        } else if (data.success && data.reason == "Phone No Updated Successfully") {
            const redisClient = await connectRedis()
            if (!redisClient) return resolve({ success: false, reason: "Redis Client not connected" })
            
            const Cookies = await cookies()    
    
            const token = jwt.sign(data.user, process.env.SECRET_KEY ?? "")
            Cookies.set("token", token)   
            await redisClient.set("token", token, { "EX" : 60 * 60 * 24 * 7 });

            resolve({ success: true, profileData: "Phone No" })
        }

            
    })

    return NextResponse.json(response)
}