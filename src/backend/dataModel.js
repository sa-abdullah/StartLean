import mongoose from 'mongoose'

const ideaSchema = new mongoose.Schema({

    idea: {
        type: String, 
        required: true
    }, 
    aiResponse: {
        type: mongoose.Schema.Types.Mixed, 
        required: true
    },
    userId: { 
        type: String, 
        required: true 
    },

}, {timestamps: true})

const Idea = mongoose.model('Idea', ideaSchema)




const userSchema = new mongoose.Schema({
    uid: {
        type: String, 
        required: true, 
        unique: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    displayName: {
        type: String
    }, 
    photoURL: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

})

const User = mongoose.model('User', userSchema)


export { Idea, User }