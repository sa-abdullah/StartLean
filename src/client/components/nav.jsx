import { useState } from 'react'
import logo from '../assets/imgs/favicon.png'
import { FaBars, FaUser} from 'react-icons/fa6'
import { useNavigate, Link } from 'react-router-dom'


export const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }
    
    const navigate = useNavigate()

    

    return (
        <>
        <div class="w-full flex justify-between items-center px-2 md:px-6 text-blue-900 py-3 shadow-lg sticky top-0 z-50 bg-white">
            <Link to="/" class="flex items-center gap-3 font-bold text-2xl cursor-default">
                <img src={logo} alt="startlean" class="w-7 lg:w-10" />
                <span>StartLean</span>
            </Link>
            <div className="gap-3 font-semibold hidden md:flex items-center">
                {/* <button class="px-4 py-2 rounded-3xl hover:bg-blue-100">Dashboard</button> */}
                <button class="px-4 py-2 rounded-3xl hover:bg-blue-100">How it Works</button>
                <button class="px-4 py-2 rounded-3xl hover:bg-blue-100">Pricing</button>
                <button onClick={() => navigate('/auth', { state: {isSignUp: true}})} class="px-4 py-2 bg-blue-900 text-white rounded-3xl hover:bg-blue-100 hover:text-blue-900">Get Started</button>
                <button class="px-4 py-2 bg-gray-100 rounded-3xl hover:bg-blue-100" onClick={() => navigate('/auth', { state: {isSignUp: true}})}>Login</button>
                <FaUser size={24} onClick={() => navigate('/auth', { state: {isSignUp: false}})} />
            </div>
            <div class="flex gap-2 md:hidden">
                <button>
                    <FaUser onClick={() => navigate('/auth', { state: {isSignUp: false}})} />
                </button>
                <button onClick={toggleDropDown} class="focus:outline-none relative">
                    <FaBars/>
                </button>
                {
                    isOpen && 
                    (
                        <div className="absolute right-0 top-13 mt-2 w-40 bg-white text-black rounded shadow-lg z-30">
                            <ul className="flex flex-col p-2 gap-2 text-md">
                                <li class="px-4 py-2 rounded-xl hover:bg-blue-100">How it Works</li>
                                <li class="px-4 py-2 rounded-xl hover:bg-blue-100">Pricing</li>
                                <li class="px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-100 hover:text-blue-900">Get Started</li>
                                <li class="px-4 py-2 bg-gray-100 rounded-xl hover:bg-blue-100" onClick={() => navigate('/auth', { state: {isSignUp: true}})}>Login</li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    )
}