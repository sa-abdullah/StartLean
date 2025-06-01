import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()


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
                        content: `Answer the question asked by the user: ${query}
                        Please return:
                        {
                          "reply": "<a detailed reply to the user's question>",
                          "summary": "<a short 5–8 word summary headline for sidebar use>"
                        }
                        Only return valid JSON. Do not include commentary.
                        `
                    }
                ]
            }, 
        )
        
        const raw = response?.choices?.[0]?.message?.content?.trim()

        // Try parsing JSON safely
        try {
            const parsed = JSON.parse(raw)
            return parsed

        } catch (err) {
            console.error('JSON parsing error:', err.message)

            return {
                reply: "Sorry, the model returned invalid.",
                summary: "Invalid output"
            }
        }

    } catch (error) {
        console.error('GROQ API Error', error.response.data || error.message)
        return {
            reply: "Sorry, something went wrong with the Groq API.",
            summary: "Groq error"
        }
    }
}