import mongoose from 'mongoose'

const ideaSchema = new mongoose.Schema({
    idea: String, 
    aiResponse: mongoose.Schema.Types.Mixed,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Idea = mongoose.model('Idea', ideaSchema)

export default Idea