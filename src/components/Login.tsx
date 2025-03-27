"use client"

import { useState } from "react"
import InputBox from "./InputBox"
import PrimaryButton from "./PrimaryButton"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"


export const Login = () => {

    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    const handleSubmit = async () => {
        const result = await axios.post("/api/login", {
            email,
            password
        })

        if (result && result.data.success) {
            router.push("/")
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
            <div className="flex flex-col justify-center align-middle space-y-2 p-2 rounded-md shadow-md border border-electric-blue">
                <InputBox label="Email" type="text" placeholder="abc@xyz.com" onInput={handleEmailInput}/>
                <InputBox label="Password" type="password" placeholder="Password" onInput={handlePasswordInput}/>
                <PrimaryButton text={"Submit"} onClick={handleSubmit}/>
                <span>Dont have an Account? <Link href={"/signup"}>Sign Up</Link></span>
            </div>
        </div>
    </>
}