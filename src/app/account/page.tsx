"use client"
import { EditableBox } from "@/components/EditableBox";
import { Navbar } from "@/components/Navbar"
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/context/Auth";
import { faBox, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Profile = () => {
    
    
    const router = useRouter()
    const { user, loading } = useAuth()
    
    const [editName, setEditName] = useState<boolean>(false)
    const [editPhone, setEditPhone] = useState<boolean>(false)
    const [editEmail, setEditEmail] = useState<boolean>(false)

    const [firstname, setFirstName] = useState<string>("")
    const [lastname, setLastName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        if (!user && !loading) {
            router.push("/login")
        }
    },[user, loading, router])

    useEffect(() => {
        if (user) {
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setPhone(user.phone)
            setEmail(user.email)
        }
    }, [user])

    if (loading || !user) {
        return <div className="p-10 text-center text-xl">Loading profile...</div>;
    }


    const Editname = () => {
        setEditName(!editName)
    }

    const EditEmail = () => {
        setEditEmail(!editEmail)
    }

    const EditPhone = () => {
        setEditPhone(!editPhone)
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {     
        setPhone(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleEmailSubmit = async () => {
        try {
            const result = await axios.post("/api/updateAccount", {
                email
            })

            if (result && result.data.success) {
                toast.success("Email updated successfully")
            }
        } catch (error) { 
            toast.error("Error updating email")
            console.log(error)
        }
    }

    const handlePhoneSubmit = async () => {
        try {
            const result = await axios.post("/api/updateAccount", {
                phone
            })

            if (result && result.data.success) {
                toast.success("Phone No updated successfully")
            }
        } catch (error) { 
            toast.error("Error updating Phone No")
            console.log(error)
        }
    }

    const handleNameSubmit = async () => {
        try {
            const result = await axios.post("/api/updateAccount", {
                firstname,
                lastname
            })

            if (result && result.data.success) {
                toast.success("Name updated successfully")
            }
        } catch (error) { 
            toast.error("Error updating Name")
            console.log(error)
        }
    }

    return <div className="bg-gray-100">
        <Toaster/>
        <Navbar/>
        <div className="mx-10 mt-10 flex space-x-7">
            <div className="flex flex-col space-y-6">
                <div className="flex bg-white min-w-xs p-2 shadow">
                    <span className="my-auto p-3">
                        <FontAwesomeIcon icon={faUserTie} className=" text-blue-500 size-7"/>
                    </span>
                    <span className="flex flex-col p-3">
                        <span className="text-xs text-gray-700">
                            Hello,
                        </span>
                        <span className="text-md font-medium">
                            {user.firstname} {user.lastname}
                        </span>
                    </span>
                </div>
                <div className="bg-white align-middle justify-center min-w-xs shadow">
                    <span className="flex my-auto p-2 border-b">
                        <span className="p-3 my-auto">
                            <FontAwesomeIcon icon={faBox} className="text-blue-500 size-5"/>
                        </span>
                        <span className="text-lg my-auto text-gray-400 font-medium">
                            MY ORDERS
                        </span>
                    </span>
                    <div className="flex my-auto p-2">
                        <span className="p-3 my-auto">
                            <FontAwesomeIcon icon={faUser} className="text-blue-500 size-5"/>
                        </span>
                        <span className="text-lg my-auto text-gray-400 font-medium">
                            Account Settings
                        </span>
                    </div>
                    <div className="flex m-auto justify-center p-3">
                        <span className="text-sm text-gray-400 font-medium">
                            Profile Information
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-7 w-full space-y-8 shadow">
                <div className="space-x-4">
                    <span className="font-bold">Personal Information</span>
                    <span className="text-sm text-electric-blue hover:cursor-pointer" onClick={Editname}>Edit</span>
                    <div className="flex space-x-4 mt-5">
                        <EditableBox title="First Name" value={user.firstname} isEditing={editName} onChange={handleFirstNameChange} />
                        <EditableBox title="Last Name" value={user.lastname} isEditing={editName} onChange={handleLastNameChange} />
                        { editName && <PrimaryButton text={"Save"} onClick={handleNameSubmit}/> }
                    </div>
                </div>
                <div>
                    <div className="space-x-4">
                        <span className="font-bold">Email Address</span>
                        <span className="text-sm text-electric-blue hover:cursor-pointer" onClick={EditEmail}>Edit</span>
                        <div className="flex space-x-4 mt-5">
                            <EditableBox title="Email Address" value={user.email} isEditing={editEmail} onChange={handleEmailChange} />
                            { editEmail && <PrimaryButton text={"Save"} onClick={handleEmailSubmit}/> }

                        </div>
                    </div>
                </div>
                <div>
                    <div className="space-x-4">
                        <span className="font-bold">Phone No</span>
                        <span className="text-sm text-electric-blue hover:cursor-pointer" onClick={EditPhone}>Edit</span>
                        <div className="flex space-x-4 mt-5">
                            <EditableBox title="Phone No" value={user.phone} isEditing={editPhone} onChange={handlePhoneChange} />
                            { editPhone && <PrimaryButton text={"Save"} onClick={handlePhoneSubmit}/> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Profile;