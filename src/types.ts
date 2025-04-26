export interface getImages {
    bucketId: string,
    folder?: string,
    nameIndex: number
}
export interface User{
    firstname: string,
    lastname: string,
    email: string,
    phone: string
}

export type AuthContextType = {
    user: User | null, 
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    loading: boolean
};

export type EditableField = 'name' | 'email' | 'phone' | null
