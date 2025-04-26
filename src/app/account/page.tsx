// /* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { EditableBox } from "@/components/EditableBox";
import { EditableSection } from "@/components/EditableSection";
import { Navbar } from "@/components/Navbar"
// import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/context/Auth";
import { EditableField } from "@/types";
import { faBox, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Profile = () => {

    const router = useRouter()
    const { user, loading } = useAuth()
    
    const [editingField, setEditingField] = useState<'name' | 'email' | 'phone' | null>(null)

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

    // const Editname = () => {
    //     setEditName(!editName)
    // }

    // const EditEmail = () => {
    //     setEditEmail(!editEmail)
    // }

    // const EditPhone = () => {
    //     setEditPhone(!editPhone)
    // }

    const EditField = (field: EditableField) => {
        setEditingField(field)
    }

    const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    },[])

    const handleLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    },[])

    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {     
        setPhone(e.target.value)
    },[])

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    },[])

    const handleSave = useCallback(async () => {
        if (!editingField) return

        const payload = (editingField === 'name') ? { firstname, lastname } : (editingField === 'email') ? { email } : { phone }
        
        try {
            const result = await axios.post("/api/updateAccount", payload)
            if (result && result.data.success) {
                toast.success(`${result.data.profileData} updated successfully`)
                setEditingField(null)
            }
        } catch (error) {
            toast.error(`Error updating ${editingField}`)
            console.log(error)
        }
    },[editingField, email, firstname, lastname, phone])

    if (loading || !user) {
        return <div className="p-10 text-center text-xl">Loading profile...</div>;
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
            <EditableSection 
            title="Personal Information"
            isEditing={editingField == "name"}
            onEditToggle={editingField == null ? () => EditField("name") : () => EditField(null)}
            onSave={handleSave}
            editableContent={
              <>
                <EditableBox
                  title="First Name"
                  value={firstname}
                  isEditing={editingField == "name"}
                  onChange={handleFirstNameChange}
                />
                <EditableBox
                  title="Last Name"
                  value={lastname}
                  isEditing={editingField == "name"}
                  onChange={handleLastNameChange}
                />
              </>
            }
          />

          <EditableSection
            title="Email Address"
            isEditing={editingField == "email"}
            onEditToggle={editingField == null ? () => EditField("email") : () => EditField(null)}
            onSave={handleSave}
            editableContent={
              <EditableBox
                title="Email Address"
                value={email}
                isEditing={editingField == "email"}
                onChange={handleEmailChange}
              />
            }
          />

          <EditableSection
            title="Phone No"
            isEditing={editingField == "phone"}
            onEditToggle={editingField == null ? () => EditField("phone") : () => EditField(null)}
            onSave={handleSave}
            editableContent={
              <EditableBox
                title="Phone No"
                value={phone}
                isEditing={editingField === "phone"}
                onChange={handlePhoneChange}
              />
            }
          />
            </div>
        </div>
    </div>
}

export default Profile;