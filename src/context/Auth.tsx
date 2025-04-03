"use client"
import { AuthContextType, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

export const AuthContext = createContext<AuthContextType>([{
    token: "",
    user: null
}, () => { }])

export const AuthProvider = ({ children } : { children : React.ReactNode}) => {
    // const [auth, setAuth] = useState<AuthType>({
    //     user: null,
    //     token: ""
    // })
    const [auth, setAuth] = useState<User | null>(null)

    useEffect(() => {
        async function fetchData() {
            const token = Cookies.get("token")
            
            if (!token) return
            
            const user = jwtDecode<User>(token)
            
            if (user) {
                // setAuth({
                //     ...auth,
                //     user: user,
                //     token: token
                // })
                setAuth(user)
            }

        }
        fetchData()
    }, [])

    return <AuthContext.Provider value={[auth, setAuth]}>
        { children }
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}