// import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
import Groq from 'groq-sdk'


// const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})


export const askGroq = async (query) => {
    try {
        const response = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile', 
                messages: [
                    {
                        role: 'system', 
                        content: `You are Startup Sage, an AI assistant that helps users refine and validate their startup ideas. When a user shares a business idea in natural language, guide them using structured models like the Lean Canvas or Problem-Solution Fit. Break down the idea into clear components (problem, solution, unique value, customer segments, etc.). Then, suggest a potential startup name, slogan, tagline, and check domain name availability. Respond helpfully, clearly, and creatively to support early-stage founders.`
                    }, 
                    {
                        role: 'user', 
                        content: query
                    }
                ]
            }, 
        )
        return response?.choices[0]?.message?.content
    } catch (error) {
        console.error('GROQ API Error', error.response.data || error.message)
        return 'Sorry, I could not analyse your startup idea at the moment'
    }
}