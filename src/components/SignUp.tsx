"use client"

import InputBox from "@/components/InputBox"
import PrimaryButton from "@/components/PrimaryButton"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import PrimaryButtonDisabled from "./PrimaryButtonDisabled"

export const SignUp = () => {

    const router = useRouter()

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)


    const handleSubmit = async () => {
        setLoading(true)
        const result = await axios.post("/api/signup", {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword
        })
        
        if (result && result.data.success) {
            toast.success("Account Created Successfully")
            router.push("/")
        } else {
            setLoading(false)
            toast.error(result.data.reason)
        }
    }

    const handleFirstNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleLastNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    
    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    return <>
        <Toaster/>
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center align-middle space-y-2 p-2 rounded-md shadow-md border border-electric-blue">
                <InputBox label="First Name" type="text" placeholder="First Name" onInput={handleFirstNameInput}/>
                <InputBox label="Last Name" type="text" placeholder="Last Name" onInput={handleLastNameInput}/>
                <InputBox label="Email" type="email" placeholder="abc@xyz.com" onInput={handleEmailInput}/>
                <InputBox label="Phone No" type="text" placeholder="98XXXXXXXX" onInput={handlePhoneInput}/>
                <InputBox label="Password" type="password" placeholder="Password" onInput={handlePasswordInput}/>
                <InputBox label="Confirm Password" type="password" placeholder="Confirm Password" onInput={handleConfirmPasswordInput}/>
                {!loading && <PrimaryButton text={"Submit"} onClick={handleSubmit}/>}
                {loading && <PrimaryButtonDisabled text={"Submit"}/>}
                <span>Already have an Account? <Link href={"/login"}>Login</Link></span>
            </div>
        </div>
    </>
}