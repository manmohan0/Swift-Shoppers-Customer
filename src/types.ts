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

export interface EditableSectionInterface {
    title: string;
    isEditing: boolean;
    onEditToggle: () => void;
    editableContent: React.ReactNode;
    onSave: () => void;
}

export type AuthContextType = {
    user: User | null, 
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    fetchData: () => Promise<void>,
    loading: boolean
};

export type EditableField = 'name' | 'email' | 'phone' | null
