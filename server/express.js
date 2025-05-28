import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import router from '../src/backend/router.js'

const app = express()
const PORT = process.env.PORT || 3001;

// app.use(cors({
//     origin: 'https://startlean.onrender.com',
//     credentials: true
// }))

app.use(cors())
app.use(express.json())
app.use('/api', router)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ MongoDB Connected')
    app.listen(PORT, () => {
        console.log(`🚀 Server running on ${PORT}`)
    })
}).catch(err => {
    console.error('❌ MongoDB connection error', err)
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Gracefully shutting down MongoDB connection')
        process.exit(0)
    })
})