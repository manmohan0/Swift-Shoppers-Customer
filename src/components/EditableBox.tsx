interface EditableBoxType { 
    title: string, 
    value: string, 
    isEditing: boolean, 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
}

export const EditableBox = ({ title, value, isEditing , onChange } : EditableBoxType) => {
    return <div className="flex flex-col border-2 border-gray-200 rounded-md p-2 min-w-72">
        <span className="text-xs text-gray-400 font-medium">
            {title}
        </span>
        { isEditing ? <input type="text" value={value} onChange={onChange} className="focus:outline-none focus:border-electric-blue" /> : <input type="text" value={value} onChange={onChange} className="focus:outline-none focus:border-electric-blue text-gray-400" disabled/>}
    </div>
}