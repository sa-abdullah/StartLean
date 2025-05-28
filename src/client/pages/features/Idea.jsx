import { useRef, useState} from 'react'
import axios from 'axios'
import { HiArrowUp } from "react-icons/hi";
import FormattedResponse from '../../components/FormatResponse.jsx'
import { CopyTextBlock } from '../../components/utils.jsx'

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const IdeaModule = () => {
    const [text, setText] = useState('')
    const [answerList, setAnswerList] = useState([])
    const textareaRef = useRef(null)

    const handleQuery = async (e) => {
        e.preventDefault()

        if (!text.trim()) return;
        const userInput = text.trim()
        
        try { 
            const response = await axios.post(
                `${backendBaseUrl}/ask`,
                { query: userInput },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                })

            const data = response?.data
            const result = data?.result

            setAnswerList(prevAnswers => [...prevAnswers, { question: userInput, response: result }])
            setText('')

        } catch (err) {

            console.error('Frontend fetch error:', err)

            if (!navigator.onLine) {
                setAnswerList(prev => [...prev, { question: userInput, response: '🚫 No internet connection. Please check your network' }]);
            } else if (err.message === 'Network Error') {
                setAnswerList(prev => [...prev, { question: userInput, response: '🌐 Network Error: Could not connect to server.' }]);
            } else {
                setAnswerList(prev => [...prev, { question: userInput, response: '❌ Something went wrong. Please try again' }]);
            }
        }
    }

    return (
        <div class="h-full flex flex-col items-center justify-center gap-10">
            {!answerList && <h2 class="text-3xl">Tell Me Your Startup Idea</h2>}
            <ul class="overflow-y-scroll w-[80%]">
                {[...answerList].reverse().map((item, index) => (
                    <div class="relative w-full h-fit prose px-3 py-6" key={index}>
                        <p class="bg-gray-300 px-6 py-4 rounded-2xl w-fit ml-auto text-lg">{item.question}</p>
                        <FormattedResponse content={item.response}/>
                        <CopyTextBlock text={item.response}/>
                    </div>
                ))
            }
            </ul>
            <form class={`w-[83%] h-[22vh] relative ${answerList.length ? 'sticky bottom-0': 'block'}`}>
                <textarea name="startupIdea" value={text} onChange={(e) => setText(e.target.value)} id="startupIdea" placeholder="Ask about your startup idea..." ref={textareaRef} class={`w-full h-full border-3 border-gray-300 bg-gray-100 rounded-4xl p-6 focus:outline-none focus:border-gray-500`}></textarea>
                <button onClick={handleQuery} class="absolute bottom-[10px] right-[10px] px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-100 hover:text-blue-900">
                    <HiArrowUp size={20}/>
                </button>
            </form>
        </div>
    )
}