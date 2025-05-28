import { useState } from 'react'
import { Nav } from '../components/nav'
import { Sidebar } from '../components/Sidebar'
import { Workspace } from './workspace'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightExpand } from 'react-icons/tb';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('idea')
    const [tabPaneOpen, setTabPaneOpen] = useState(true)


    return (
        <>
            <div class="h-screen flex flex-col">
                <Nav />
                <div class="flex  flex-1 overflow-auto bg-gray-100 relative">
                    <button class="absolute" onClick={() => setTabPaneOpen(!tabPaneOpen)}>
                        {tabPaneOpen ? (
                                <TbLayoutSidebarLeftCollapse size={24} class="absolute left-60 top-6"/>
                            ): (
                                <TbLayoutSidebarRightExpand size={24} class="absolute left-0 top-6"/>
                            )
                        }
                    </button>
                    {tabPaneOpen && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
                    <Workspace activeTab={activeTab}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard

