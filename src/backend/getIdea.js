import Idea from './dataModel.js'
import { askGroq } from './groq.js'


const refineIdea = async ({ description }) => {
    
    const response = await askGroq(description)

    const newChat = new Idea({
        idea: description, 
        aiResponse: response, 
        createdAt: Date.now()
    })

    await newChat.save();
    return {idea: description, aiResponse: response}  
}

export default refineIdea