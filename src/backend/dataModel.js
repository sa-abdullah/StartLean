import mongoose from 'mongoose'

const ideaSchema = new mongoose.Schema({
    
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session', 
        required: true,
    }, 
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

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true, 
    }, 
    createdAt: {
        type: Date, 
        default: Date.now(), 
    }, 
    headline: {
            type: String,
            required: true , 
    },
})

const Session = mongoose.model('Session', sessionSchema)


export { Idea, User, Session }