import Idea from './dataModel.js'
import { askGroq } from './groq.js'


const refineIdea = async ({ query }) => {

    if (!query) {
        throw new Error('Missing query in refineIdea')
    }
    
    const response = await askGroq(query)

    if (!response) {
        throw new Error('AskGroq not returning response')
    }
    // console.log(response)

    const newChat = new Idea({
        idea: query, 
        aiResponse: response, 
        createdAt: Date.now()
    })

    await newChat.save();
    return {idea: query, aiResponse: response}  
}

export default refineIdea