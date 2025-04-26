"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/Auth"
import { jwtDecode } from "jwt-decode"
import { User } from "@/types"
import toast, { Toaster } from "react-hot-toast"
import InputBox from "./InputBox"
import PrimaryButton from "./PrimaryButton"
import axios from "axios"
import Link from "next/link"
import PrimaryButtonDisabled from "./PrimaryButtonDisabled"
import Cookies from "js-cookie"

export const Login = () => {

    const router = useRouter()

    const { setAuth } = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    
    const handleSubmit = async () => {
        setLoading(true)
        
        const result = await axios.post("/api/signin", {
            email,
            password
        })
        
        if (result && result.data.success) {
            toast.success("Logged in successfully")

            const token = Cookies.get("token")
            const user = jwtDecode<User>(token ?? "")

            setAuth({
                user: user,
                token: result.data.token
            })

            router.push("/")
        } else if (result && !result.data.success && result.data.reason == "User does not exist") {
            toast.error("User does not exist. Please Sign Up")
            setLoading(false)
            router.push("/signup")
        } else if (result && !result.data.success && result.data.reason == "Internal Server Error") {
            setLoading(false)
            toast.error("Internal Server Error. Please try again later")
        } else if (result && !result.data.success && result.data.reason == "Incorrect Password") {
            setLoading(false)
            toast.error("Incorrect Password")
        } else if (result && !result.data.success && result.data.reason == "Wrong Format") {
            setLoading(false)
            toast.error(result.data.issue)
        }
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return <>
        <div className="h-screen flex items-center justify-center">
            <Toaster/>
            <div className="flex flex-col justify-center align-middle space-y-2 p-2 rounded-md shadow-md border border-electric-blue">
                <InputBox label="Email" type="text" placeholder="abc@xyz.com" onInput={handleEmailInput}/>
                <InputBox label="Password" type="password" placeholder="Password" onInput={handlePasswordInput}/>
                {!loading && <PrimaryButton text={"Submit"} onClick={handleSubmit}/>}
                {loading && <PrimaryButtonDisabled text={"Submit"}/>}
                <span>Dont have an Account? <Link href={"/signup"}>Sign Up</Link></span>
            </div>
        </div>
    </>
}