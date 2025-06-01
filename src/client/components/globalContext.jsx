import { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const GlobalContext = createContext()
import { leanAuth } from '../../backend/auth'
import { onAuthStateChanged } from 'firebase/auth'

const navigate = useNavigate


const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [answerList, setAnswerList] = useState([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(leanAuth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                console.log('user signed in', currentUser)
            } else {
                setUser(null)
            }
        });

        return () => unsubscribe()
    }, []);

    const handleQuery = async (text) => {
        if (!text.trim()) return;
        const userInput = text.trim()
        
        const token = await user.getIdToken()

        if (!user) {
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
        <GlobalContext.Provider value={{ user, setUser, answerList, handleQuery }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => useContext(GlobalContext)