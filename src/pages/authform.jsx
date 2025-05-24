import { useState, useEffect } from 'react';
import { leanAuth } from './auth'; 
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    // GoogleAuthProvider, 
    // signInWithPopup 
} from 'firebase/auth';

import { useLocation } from 'react-router-dom';



const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

    const location = useLocation(); 
    useEffect(() => {
    if (location?.state?.isSignUp === false) {
        setIsSignUp(true) 
    } else {
        setIsSignUp(false)
    }
}, [location.state])


    // const handleGoogleSignin = async() => {
    //     const provider = GoogleAuthProvider();
    //     try {
    //         const result = await signInWithPopup(leanAuth, provider);
    //         const user = result.user
    //     } catch (err) {
    //         setError("Error igning in with Google", err)
    //     }
    // }
    

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
            if (isSignUp) {
                await createUserWithEmailAndPassword(leanAuth, email, password)
            } else {
                await signInWithEmailAndPassword(leanAuth, email, password)
            }
        } catch (err) {
            setError(err.message)
        }
    }


    return (
        <>
            <div class="max-w-lg mx-auto p-6 rounded shadow-2xl flex flex-col h-[60vh] mt-20">
                <h2 class="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Log In"}</h2>
                <form onSubmit={handleSubmit} class="space-y-4">
                    <input class="w-full p-2 border rounded" type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input class="w-full p-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    {error && <p class="text-red-500">{error}</p>}
                    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">{isSignUp ? "Sign Up" : "Log In"}</button>
                </form>
                {/* <button onClick={handleGoogleSignin} class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Sign In With Google
                </button> */}
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