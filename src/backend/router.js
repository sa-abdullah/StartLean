import express from 'express'
// import refineIdea from './getIdea.js'
import { askGroqTwoStep } from './groq.js'
import  { Idea, Session } from './dataModel.js'
import verifyToken from './firebase.js'

const router = express.Router()

router.post('/ideas', verifyToken, async (req, res) => {
    const { query, sessionId } = req.body


    if (!query) {
        return res.status(400).json({error: 'Missing query'})
    }

    try {
        const groqResult = await askGroqTwoStep(query)

        const headline = groqResult.headline
        const answer = groqResult.answer

        let usedSessionId = sessionId

        if (!sessionId) {
            const newSession = new Session({
                userId: req.user.uid,
                headline: headline,  
                createdAt: Date.now()
            })

            await newSession.save()
            usedSessionId = newSession._id
        } else {
            const session = await Session.findById(sessionId)
            if (session && session.headline === 'New chat' && headline != 'New chat') {
                session.headline = headline 
                await session.save()
            }
        }

        if (!answer) {
            return res.status(500).json({error: 'Failed to get a reponse from Groq'})
        }
        
        const newChat = new Idea({
            sessionId: usedSessionId,
            idea: query, 
            answer: answer, 
            createdAt: Date.now(), 
            userId: req.user.uid || null
        })
        await newChat.save()

        return res.status(201).json({ result: newChat, sessionId: usedSessionId, headline })

    } catch (err) {
        console.error("Server error:", err.message)
        return res.status(500).json({ error: 'Internal server error' })
    }
})



// router.get('/ideas', verifyToken, async (req, res)  => {
//     try {
//         const ideas = await Idea.find({ userId: req.user.uid}).sort({ createdAt: -1 })
//         res.status(200).json(ideas)
//     } catch (err) {
//         console.error('Error fetching ideas:', err.message)
//         res.status(500).json({ error: 'Failed to retrieve ideas' })
//     }
// })


router.get('/history', verifyToken, async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user.uid})
        .sort({ createdAt: -1 })
        .lean();

        const idsOfSessions = sessions.map(s => s._id)

        const ideas = await Idea.find({ sessionId: { $in: idsOfSessions }})
        .sort({ createdAt: 1 })
        .lean();

        const history = sessions.map(session => ({
            sessionId: session._id, 
            headline: session.headline, 
            createdAt: session.createdAt, 
            answers: ideas.filter(idea => idea.sessionId.toString() === session._id.toString())
        }))
        res.status(200).json(history)
    } catch (err) {
        console.error('Error fetching history:', err.message)
        res.status(500).json({ error: 'Failed to retrieve history' })
    }
})

export default router


