import { useState, useEffect, } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { leanAuth } from '../../backend/auth'; 
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    setPersistence, 
    browserLocalPersistence, 
    browserSessionPersistence
} from 'firebase/auth';
import Logo from '../assets/imgs/favicon.png'

import { useLocation } from 'react-router-dom';
import { useGlobal } from '../components/globalContext'
import googleLogo from '../assets/imgs/g-logo.png'

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const { user, setUser } = useGlobal()
    const [rememberMe, setRememberMe] = useState(false)


    const location = useLocation(); 
    useEffect(() => {
        if (location?.state?.isSignUp === false) {
            setIsSignUp(true) 
        } else {
            setIsSignUp(false)
        }
    }, [location.state])

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleGoogleSignin = async() => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(leanAuth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
            
            const userCred = await signInWithPopup(leanAuth, provider);
            console.log('user signed in successfully via Google', userCred.user)
            setUser(userCred.user)
            navigate('/dashboard')

            setEmail("")          
            setPassword("")
        } catch (err) {
            setError(`Error signing in with Google ${err.message}`)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError("")

        if (!emailRegex.test(email)) {
            setError("Invalid email format")
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol")
            return;
        }

        try {
            await setPersistence(leanAuth, rememberMe ? browserLocalPersistence : browserSessionPersistence)

            const userCred = isSignUp ?
            await createUserWithEmailAndPassword(leanAuth, email, password) :
            await signInWithEmailAndPassword(leanAuth, email, password)
            
            console.log('user signed in successfully', userCred.user)
            setUser(userCred.user)
            navigate('/dashboard')

            setEmail("")
            setPassword("")

        } catch (err) {
            setError(err.message)
        }
    }

    

    return (
        <>
            <div class="max-w-lg mx-auto p-6 rounded shadow-2xl flex flex-col gap-5 h-fit mt-20">
                <Link to="/" class="flex items-center gap-2 mb-4 w-full">
                    <img src={Logo} alt="Logo" class="w-7 h-7" />
                    <p class="text-xl font-bold text-blue-900">StartLean</p>
                </Link>
                <h2 class="text-lg font-semibold mb-4">{isSignUp ? "Sign Up" : "Log In"}</h2>
                <button onClick={handleGoogleSignin} class="bg-white text-black px-4 py-2 rounded shadow-md flex items-center justify-center gap-2 text-lg py-2 hover:outline-3 outline-gray-300">
                    <img src={googleLogo} alt="" class="w-6 h-6"/> Sign In With Google
                </button>
                <form onSubmit={handleSubmit} class="space-y-4">
                    <input class="w-full p-2 rounded hover:outline-3 outline-gray-300 outline-1" type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input class="w-full p-2 rounded hover:outline-3 outline-gray-300 outline-1" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    {error && <p class="text-red-500">{error}</p>}
                    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">{isSignUp ? "Sign Up" : "Log In"}</button>
                </form>
                <span class="inline-flex items-center">
                    <input type="checkbox" id="remember" class="mr-2" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <label htmlFor="remember" class="text-sm">Remember me?</label>
                </span>
                <p class="mt-4 text-sm text-center">
                    { isSignUp ? "Already Have an Account?" : "Don't Have an Account?"}
                    <button onClick={() => setIsSignUp(!isSignUp)} class="ml-2 text-blue-500 underline">
                        {isSignUp ? "Log In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </>
    )
}

export default AuthForm