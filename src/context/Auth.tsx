"use client"
import { AuthContextType, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    fetchData: async () => { },
    loading: true
})

export const AuthProvider = ({ children } : { children : React.ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    async function fetchData() {
        const token = Cookies.get("token")
        console.log(token)
        if (!token) {
            return
        }
        
        const user = jwtDecode<User>(token)
        if (user) {
            setUser(user)
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetchData()    
            setLoading(false)   
        })()
    }, [])

    return <AuthContext.Provider value={{ user, setUser, loading, fetchData }}>
        { children }
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}