import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

// Generate the detailed answer
const generateAnswer = async (query) => {
try {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: `You are Startup Sage, an AI assistant that helps users refine and validate their startup ideas. Be detailed, helpful, and creative.`,
            },  
            {  
                role: 'user',
                content: query,
            },
        ],
        temperature: 0.7,
    })

    const content = response?.choices?.[0]?.message?.content?.trim()
    return content || null
  } catch (error) {
    console.error('Groq API Error (answer)', error.response?.data || error.message)
    return null
  }
}


// Generate a 5–8 word headline summary of the answer
const generateHeadline = async (query, answer) => {

    try {
    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
              role: 'user',
              content: `Summarize the following text in 5–8 words as a headline. Use title case. 
                Text: ${answer}
                Headline:`,
            },
        ],
        temperature: 0.3,
    })

    const headline = response?.choices?.[0]?.message?.content?.trim()
    return headline || 'New chat'
  } catch (error) {
    console.error('Groq API Error (headline)', error.response?.data || error.message)
    return 'New chat'
  }
}

// Combined function
export const askGroqTwoStep = async (query) => {
    const answer = await generateAnswer(query)
    
    const isGreeting = (query) => {
        return /^(hi+|hello+|hey+|greetings|good\s(morning|afternoon|evening)|yo|sup|start\s(chat)|new\s(chat))[\s!.,]*$/i.test(query.trim())
    }

    const headline = (!answer || isGreeting(query)) ? 'New chat' : await generateHeadline(query, answer)

    return {
        headline,
        answer: answer || 'Sorry, no detailed answer could be generated.',
    }
}
