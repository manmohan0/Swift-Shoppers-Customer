"use client"
import { AuthContextType, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import axios from "axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    fetchData: async () => { },
    loading: true,
    logout: async () => { }
})

export const AuthProvider = ({ children } : { children : React.ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    async function fetchData() {
        let token = Cookies.get("token")
        console.log(token)
        if (!token) {
            try {
                const res = await axios.get("http://localhost:3002/auth/trylogin")
                const data = res.data
                console.log(data)
                if (data.success && data.reason == "") {
                    Cookies.set("token", data.token, { expires: 1 })
                    token = data.token
                } else if (!data.success && data.reason == "Token Expired") {
                    Cookies.remove("token")
                    setUser(null)
                    router.push("/signin")
                    return
                } else if (!data.success && data.reason == "Token Not Found") {
                    setUser(null)
                    return
                }
            } catch (e) {
                console.log(e)
                return
            }
        }

        const user = jwtDecode<User>(token ?? "")
        
        if (user && user.role == 'Customer') {
            setUser(user)
        } else {
            setUser(null)
            return
        }
    }

    
    async function logout() {
        const res = await axios.get("http://localhost:3002/auth/logout")
        const data = res.data
        if (data.success && data.reason == "") {
            Cookies.remove("token")
            setUser(null)
            router.push("/signin")
        } else {
            console.log("Logout failed")
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetchData()    
            setLoading(false)   
        })()
    }, [])

    return <AuthContext.Provider value={{ user, setUser, loading, fetchData, logout }}>
        { children }
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}