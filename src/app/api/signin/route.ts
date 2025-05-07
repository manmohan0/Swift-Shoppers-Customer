import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { connectRedis } from "@/config/redis";

export async function POST(req: NextRequest) {
    const msg = await req.json()
            
        const response = await new Promise(async resolve => {
            
            const response = await axios.post("http://localhost:3002/auth/signin", msg, {
                withCredentials: true,
            })

            const data = response.data
            
            if (data.success && data.reason == "") {
                const Cookies = await cookies()
                const redisClient = await connectRedis()

                if (data.role == "Merchant") return resolve({ success: false, reason: "You are not authorized to access this page" })
                if (!redisClient) return resolve({ success: false, reason: "Redis Client not connected" })

                const token = await redisClient.get("token")

                if (!token) return resolve({ success: false, reason: "Token not found" })

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
            } else if (!data.success && data.reason == "Redis Server Error") {
                resolve({ success: false, reason: "Redis Client not connected" })
            } else if (!data.success && data.reason == "Database Server Error") {
                resolve({ success: false, reason: "Database Server Error" })
            }
        })
        
    return NextResponse.json(response)
}