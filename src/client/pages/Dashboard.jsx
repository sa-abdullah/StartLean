import { useState } from 'react'
import { Nav } from '../components/nav'
import { Sidebar, TopNav } from '../components/Sidebar'
import { Workspace } from './workspace'
import { signOut } from 'firebase/auth'
import { leanAuth } from '../../backend/auth.js'
import { useGlobal } from '../components/globalContext'
import { useNavigate } from 'react-router-dom'
import { HiLogout } from "react-icons/hi";





const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('idea')
    const navigate = useNavigate()
    const { setUser } = useGlobal()

    const handleLogout = async () => {
        try {
            await signOut(leanAuth)
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            setUser(null)
            navigate('/')
        } catch (err) {
            console.log('Could not log out', err)
        }
    }


    return (
        <>
            <div class="h-screen flex flex-col relative">
                {/* <Nav /> */}
                <div class="flex flex-1 overflow-auto bg-gray-100 relative">
                    <section class="h-full flex flex-1 relative">
                        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </section>
                    <section class="flex flex-col w-full">
                        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Workspace activeTab={activeTab}/>
                    </section>
                    <button onClick={handleLogout} class={`absolute flex gap-3 items-center bottom-1 left-1 bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 rounded-md`}>
                        Logout 
                    </button>
                </div>
            </div>
        </>
    )
}

export default Dashboard


