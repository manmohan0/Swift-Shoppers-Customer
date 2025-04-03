export interface User{
    firstname: string,
    lastname: string,
    email: string,
    phone: string
}

export interface AuthType {
    token: string
    user: User | null,
}

export type AuthContextType = [{
    token: string,
    user: User | null
}, React.Dispatch<React.SetStateAction<AuthType>>] | null;