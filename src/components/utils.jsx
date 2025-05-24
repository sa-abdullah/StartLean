import { useState } from 'react'
import { FaRegCopy } from 'react-icons/fa6'


// Syntax for Copying text anywhere
export const CopyTextBlock = ({text}) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); 
        })
    }

    return (
        <button onClick={handleCopy} class="absolute bottom-[10px] left-[10px]">
            {copied ? <span className="text-sm text-green-600 mt-1 block">Copied!</span> :  <FaRegCopy size={20} class="text-gray-600 hover:text-blue-700"/>}
        </button>
    )
}