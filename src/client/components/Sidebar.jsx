import { useState } from 'react'
import { HiOutlineLightBulb, HiOutlinePresentationChartBar, HiOutlineBadgeCheck, HiMenu } from "react-icons/hi"
import { FaRegFileAlt, FaUserSecret, FaPalette } from "react-icons/fa"
import { useGlobal } from './globalContext'
import headshot from '../assets/imgs/headshot.jpg'
// import Logo from '../assets/imgs/logo.png'


import { HiOutlinePencilSquare } from "react-icons/hi2"


export const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user, historyList } = useGlobal()
    const [tabPaneOpen, setTabPaneOpen] = useState(true)

    const tabs = [
        { id: 'idea', content: 'I am a good boy'}, 
        { id: 'spec', content: 'Product Spec Writer'}, 
        { id: 'pitch', content: 'Pitch Deck Generator'}, 
        { id: 'competitor', content: 'Competitor Research'}, 
        { id: 'landing page', content: 'Landing Page Designer' }, 
        { id: 'validator', content: 'Idea Validation'}

    ]

    console.log(user)
    console.log(historyList)



    return (
        <>
        {tabPaneOpen ? 
            (
                <aside class="w-70 bg-white shadow-lg p-4 space-y-6">
                    <div class="flex gap-3 items-center w-full bg-gray-100">
                        <img src={user?.photoURL || headshot} alt="" class="rounded-full w-8 h-8 object-cover"/>
                        <h2 class="text-lg font-semibold">{user?.displayName || 'Abdullah'}</h2>
                    </div>
                    <div class="relative flex flex-1 justify-between">
                        <button>
                            <HiOutlinePencilSquare size={30}/>
                        </button>
                        <button class="" onClick={() => setTabPaneOpen(!tabPaneOpen)}>
                            <HiMenu size={30} class=" left-60 top-6"/>
                        </button>
                    </div>
                    <div>
                        {
                            tabs.map((tab) => (
                                <ul key={tab.id}>
                                    <p onChange={() => setActiveTab(tab.id)} class={`flex gap-2 items-center w-full text-left px-4 py-2 mb-2 rounded ${activeTab === tab.id ? "bg-gray-600 text-white" : "hover:bg-gray-200 hidden"}`}>
                                        {tab.content} 
                                    </p>
                                </ul>
                            ))
                        }
                    </div>
                </aside>
            ) : (
                <aside class="w-fit bg-white shadow-lg p-4">
                    <div class="relative flex flex-col flex-1 justify-between gap-10 ">
                        <img src={user?.photoURL || headshot} alt="" class="rounded-full w-10 h-10 object-cover"/>
                        <button class="" onClick={() => setTabPaneOpen(!tabPaneOpen)}>
                            <HiMenu size={30} class=" left-60 top-6"/>
                        </button>
                        <button>
                            <HiOutlinePencilSquare size={30}/>
                        </button>
                    </div>
                </aside>
            )

        }
        </>
    )
}

export const TopNav = ({ activeTab, setActiveTab }) => {

    const tabs = [
        { id: 'idea', label: 'Research Idea', icon: <HiOutlineLightBulb/>}, 
        { id: 'spec', label: 'Write Product Spec', icon: <FaRegFileAlt/>}, 
        { id: 'pitch', label: 'Generate Pitch Deck', icon: <HiOutlinePresentationChartBar/>}, 
        { id: 'competitor', label: 'Find Competitors', icon: <FaUserSecret/>}, 
        { id: 'landing page', label: 'Design Landing Page', icon: <FaPalette/> }, 
        { id: 'validator', label: 'Validate Idea', icon: <HiOutlineBadgeCheck/>}
    ]

    return (
        
        <div class="flex min-w-auto items-center bg-white">
            {tabs.map((tab, index) => {
                return (
                    <button key={index} onClick={() => setActiveTab(tab.id)} class={`flex gap-2 items-center w-full text-left p-4 rounded ${activeTab === tab.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}>
                        <p class="text-sm">{tab?.icon}</p>
                        <p class="text-sm no-wrap">{tab?.label}</p>
                    </button>
                )
            })}
        </div>
    )
}