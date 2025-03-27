interface PrimaryButtonProps {
    text: string
}

export default function PrimaryButtonDisabled ({ text } : PrimaryButtonProps) {
    return <span className="p-2 w-fit rounded-md cursor-not-allowed bg-gray-200 text-white">
        {text}
    </span>
}