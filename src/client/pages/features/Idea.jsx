import { useRef, useState} from 'react'
import axios from 'axios'
import { HiArrowUp } from "react-icons/hi";
import FormattedResponse from '../../components/FormatResponse.jsx'
import { CopyTextBlock } from '../../components/utils.jsx'
import { useAuth } from '../../components/globalContext.jsx'

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const IdeaModule = () => {
    const [text, setText] = useState('')
    const [answerList, setAnswerList] = useState([])
    const textareaRef = useRef(null)
    const { user } = useAuth();

    const handleQuery = async (e) => {
        e.preventDefault()

        if (!text.trim()) return;
        const userInput = text.trim()

        const token = localStorage.getItem('token')

        if (!token) {
            alert('Please log in to use this feature')
            return;
        }
        
        try { 
            const response = await axios.post(
                `${backendBaseUrl}/api/ideas`,
                { query: userInput },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }, 
                })

            const result = response?.data?.result
            console.log('Frontend fetch result: ', result)

            setAnswerList(prevAnswers => [...prevAnswers, { response: result }])
            setText('')

        } catch (err) {

            console.error('Frontend fetch error:', err)

            const message = !navigator.onLine ? 
            '🚫 No internet connection. Please check your network' :
            err.message === 'Network Error' ?
            '🌐 Network Error: Could not connect to server.' :
            '❌ Something went wrong. Please try again';
            setAnswerList(prev => [...prev, { response: message }])
        }
    }

    
    return (
        <div class="h-full flex flex-col items-center justify-center gap-10">
            {<h2 class="text-3xl">Tell Me Your Startup Idea</h2>}
            <ul class="overflow-y-scroll w-[80%]">
                {[...answerList].reverse().map((item, index) => (
                    <div class="relative w-full h-fit prose px-3 py-6" key={index}>
                        {typeof item.response === 'string' ? (
                            <p class="text-red-500">{item?.response}</p>
                        ):(
                            <>
                                <p class="bg-gray-300 px-6 py-4 rounded-2xl w-fit ml-auto text-lg">{item.response.idea}</p>
                                <p>{user?.email}</p>
                                <FormattedResponse content={item?.response?.aiResponse}/>
                                <CopyTextBlock text={item?.response?.aiResponse}/>
                            </>
                        )}
                    </div>
                ))
            }
            </ul>
            <form onSubmit={handleQuery} class={`w-[83%] h-[22vh] relative ${answerList.length ? 'sticky bottom-0': 'block'}`}>
                <textarea name="startupIdea" value={text} onChange={(e) => setText(e.target.value)} id="startupIdea" placeholder="Ask about your startup idea..." ref={textareaRef} class={`w-full h-full border-3 border-gray-300 bg-gray-100 rounded-4xl p-6 focus:outline-none focus:border-gray-500`}></textarea>
                <button type="submit" class="absolute bottom-[10px] right-[10px] px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-100 hover:text-blue-900">
                    <HiArrowUp size={20}/>
                </button>
            </form>
        </div>
    )
}