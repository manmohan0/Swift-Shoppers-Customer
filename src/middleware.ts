import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"
// import { connectRedis } from "./clients/redis";

export default async function middleware(req: NextRequest) {
    // const redisClient = await connectRedis()
    // console.log(redisClient)
    // if (!redisClient) {
        // console.error("Redis client not connected")
        // return NextResponse.redirect(new URL('/login', req.url))   
    // }    

    // const token = await redisClient.get("token")
    const token = req.cookies.get("token")?.value
    const { pathname } = req.nextUrl

    const Auth_Optional_Routes: string[] = ["/"]
    const Auth_Required_Routes: string[] = ["/account"]

    const isOptionalRoute = Auth_Optional_Routes.some(route => pathname.startsWith(route))    
    const isRequiredRoute = Auth_Required_Routes.some(route => pathname.startsWith(route))

    if (!token) {
        if (isOptionalRoute) return NextResponse.next()
        return NextResponse.redirect(new URL('/login', req.url))
    }
    

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY)
    const user = await jwtVerify(token, secret)
    
    if (user) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/'],
};