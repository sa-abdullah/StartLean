import { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'
const GlobalContext = createContext()
import { leanAuth } from '../../backend/auth'
import { onAuthStateChanged } from 'firebase/auth'


const backendBaseUrl = import.meta.env.VITE_BACKEND_URL

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [answerList, setAnswerList] = useState([])
    // const [ token, setToken] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(leanAuth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                console.log('user signed in', currentUser)
            }
        });

        return () => unsubscribe()
    }, []);

    const handleQuery = async (text) => {
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