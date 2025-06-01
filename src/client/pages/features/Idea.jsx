import { useRef, useState} from 'react'
import { HiArrowUp } from "react-icons/hi";
import FormattedResponse from '../../components/FormatResponse.jsx'
import { CopyTextBlock } from '../../components/utils.jsx'
import { useGlobal } from '../../components/globalContext.jsx'


export const IdeaModule = () => {
    const [text, setText] = useState('')
    const textareaRef = useRef(null)
    const { answerList, handleQuery } = useGlobal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleQuery(text)
        setText('')
    }

    
    return (
        <div class="h-full flex flex-col items-center justify-center gap-10">
            {<h2 class="text-3xl">Tell Me Your Startup Idea</h2>}
            <ul class="overflow-y-scroll w-[80%] h-auto">
                {[...answerList].reverse().map((item, index) => (
                    <div class="relative w-full h-fit prose px-3 py-6" key={index}>
                        {typeof item.response === 'string' ? (
                            <p class="text-red-500">{item?.response}</p>
                        ):(
                            <>
                                <p class="bg-gray-300 px-6 py-4 rounded-2xl w-fit ml-auto text-lg">{item.response.idea}</p>
                                <FormattedResponse content={item?.response?.aiResponse}/>
                                <CopyTextBlock text={item?.response?.aiResponse}/>
                            </>
                        )}
                    </div>
                ))}
            </ul>
            <form onSubmit={handleSubmit} class={`w-[83%] h-[22vh] relative ${answerList.length ? 'sticky bottom-0': 'block'}`}>
                <textarea name="startupIdea" value={text} onChange={(e) => setText(e.target.value)} id="startupIdea" placeholder="Ask about your startup idea..." ref={textareaRef} class={`w-full h-full border-3 border-gray-300 bg-gray-100 rounded-4xl p-6 focus:outline-none focus:border-gray-500`}></textarea>
                <button type="submit" class="absolute bottom-[10px] right-[10px] px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-100 hover:text-blue-900">
                    <HiArrowUp size={20}/>
                </button>
            </form>
        </div>
    )
}