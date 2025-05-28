import { User } from './dataModel.js'


//Firebase ADMIN SETUP

import admin from 'firebase-admin'
import { readFileSync } from 'fs'

const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || path.resolve('C:/Users/USER/Documents/My_software_development_journey/Projects/React/service-account-file-firebase.json')

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'))

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}


//Token Verification Code 

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Invalid authorization header format'})
    }

    const token = authHeader?.split(' ')[1]

    if (!token) {
        return res.status(401).json({error: 'Missing token'})
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token)
        req.user = decoded

        await User.updateOne(
            { uid: decoded.uid }, 
            {
                $setOnInsert: {
                    uid: decoded.uid, 
                    email: decoded.email, 
                    displayName: decoded.displayName, 
                    photoURL: decoded.photoURL, 
                    createdAt: Date.now()
                }
            }, 
            { upsert: true}
        ); 
                
        // const existingUser = await User.findOne({ uid: decoded.uid });
        // if (!existingUser) {
        //     const newUser = new User({
        //         uid: decoded.uid, 
        //         email:decoded.email,
        //         displayName: decoded.displayName,
        //         photoURL: decoded.photoURL,
        //         createdAt: Date.now()
        //     }); 
        //     await newUser.save()
        // }

        next()

    } catch (err) {
        console.error('Token verification failed', err.message)
        res.status(401).json({error: 'Unauthorized: Invalid token'})
    }
}


export default verifyToken