interface inputBoxProps {
    label: string
    type: string
    placeholder: string
    onInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function InputBox({label, type, placeholder, onInput} : inputBoxProps) {
    return <>
        <div className="flex flex-col w-fit space-y-1 justify-center">
            <span className="w-fit mx-1">{label}</span>
            <input type={type} className="bg-gray-200 w-96 px-2 py-1 rounded-md outline-none" onInput={onInput} placeholder={placeholder} required/>
        </div>
    </>
}