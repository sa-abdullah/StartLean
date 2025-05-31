import { useState } from 'react'
import { Nav } from '../components/nav'
import { Sidebar, TopNav } from '../components/Sidebar'
import { Workspace } from './workspace'



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('idea')


    return (
        <>
            <div class="h-screen flex flex-col">
                {/* <Nav /> */}
                <div class="flex flex-1 overflow-auto bg-gray-100 relative">
                    <section class="h-full flex flex-1 relative">
                        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    </section>
                    <section class="flex flex-col w-full">
                        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
                        <Workspace activeTab={activeTab}/>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Dashboard


const DashNav = () => {

}