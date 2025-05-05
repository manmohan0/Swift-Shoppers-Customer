interface PrimaryButtonProps {
    text: string
    onClick: () => void
}

export default function PrimaryButton ({ text, onClick } : PrimaryButtonProps) {
    return <span onClick={onClick} className="my-auto p-2 w-fit rounded-md cursor-pointer bg-electric-blue text-white">
        {text}
    </span>
}