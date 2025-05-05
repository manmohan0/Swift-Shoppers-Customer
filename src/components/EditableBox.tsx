import React from "react"

interface EditableBoxType { 
    title: string, 
    value: string, 
    isEditing: boolean, 
    type: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void 
}

export const EditableBox = React.memo(({ title, value, isEditing, type, onChange } : EditableBoxType) => {
    return <div className="flex flex-col border-2 border-gray-200 rounded-md p-2 min-w-72">
        <span className="text-xs text-gray-400 font-medium">
            {title}
        </span>
        { isEditing ? <input type={type} value={value} onChange={onChange} className="focus:outline-none focus:border-electric-blue" /> : <input type="text" value={value} className="focus:outline-none focus:border-electric-blue text-gray-400" disabled/>}
    </div>
})

EditableBox.displayName = "EditableBox"