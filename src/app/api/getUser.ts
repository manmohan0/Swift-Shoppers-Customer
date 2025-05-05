import { cookies } from "next/headers"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { User } from "@/types"

dotenv.config()

export const getUser = async () => {
    const cookie = await cookies()
    const token = cookie.get("token")?.value

    if (!token) {
        return null
    }

    const user = jwt.verify(token, process.env.SECRET_KEY ?? "") as User
    
    return user
}