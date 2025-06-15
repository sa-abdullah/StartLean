import { useState } from 'react'
import { Nav } from '../components/nav'
import { Sidebar, TopNav } from '../components/Sidebar'
import { Workspace } from './workspace'
// import { HiLogout } from "react-icons/hi";





const Dashboard = () => {
    const [activeChat, setActiveChat] = useState('idea')


    return (
        <>
            <div class="h-screen flex flex-col relative">
                {/* <Nav /> */}
                <div class="flex flex-1 overflow-auto bg-gray-100 relative">
                    <section class="h-full flex flex-1 relative">
                        <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
                    </section>
                    <section class="flex flex-col w-full">
                        <TopNav activeChat={activeChat} setActiveChat={setActiveChat} />
                        <Workspace activeChat={activeChat}/>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Dashboard


