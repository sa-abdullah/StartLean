import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLightBulb, HiOutlinePresentationChartBar, HiOutlineBadgeCheck, HiMenu, HiSearch, HiOutlineCog, HiOutlineChatAlt2, HiOutlineLogout } from "react-icons/hi"
import { FaRegFileAlt, FaUserSecret, FaPalette } from "react-icons/fa"
import { useGlobal } from './globalContext'
import headshot from '../assets/imgs/headshot.jpg'
import Favicon from '../assets/imgs/favicon.png'
import { HiOutlinePencilSquare } from "react-icons/hi2"


export const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user, historyList, startNewChat, setAnswerList, answerList, setCurrentSessionId, currentSessionId, handleLogout } = useGlobal()
    const [tabPaneOpen, setTabPaneOpen] = useState(true)
    const [logoutModal, setLogoutModal] = useState(false)
    const navigate = useNavigate()

    const titles = historyList.map(list => list.headline)
    console.log(titles)
    console.log(typeof titles)


    const tabs = [
        { id: 'idea', content: historyList}, 
        { id: 'spec', content: 'Product Spec Writer'}, 
        { id: 'pitch', content: 'Pitch Deck Generator'}, 
        { id: 'competitor', content: 'Competitor Research'}, 
        { id: 'landing page', content: 'Landing Page Designer' }, 
        { id: 'validator', content: 'Idea Validation'}

    ]

    console.log(user)
    console.log(historyList)

    const fetchPastAnswers = (answers = [], sessionId) => {

        setCurrentSessionId(sessionId)
        // const cleanedEntries = answers.map((entry) => ({
        //     idea: entry.idea, 
        //     answer: entry.answer, 
        //     createdAt: entry.createdAt, 
        //     sessionId: entry.sessionId, 
        //     _id: entry.id
        // })) 

        const cleanedEntries = answers.map(entry => entry)
        setAnswerList(cleanedEntries)
        console.log(answerList)
    }

    const loggingOut = () => {
        handleLogout()
        navigate('/')
    }


    return (
        <>
        {tabPaneOpen ? 
            (
                <aside class="w-80 bg-white shadow-lg p-4 h-full flex flex-col">
                    <div class="relative flex justify-between mb-8">
                        <img src={Favicon} alt="" class="w-5 object-cover"/>
                        <button class="" onClick={() => setTabPaneOpen(!tabPaneOpen)}>
                            <HiMenu size={20} class=" left-60 top-6"/>
                        </button>
                    </div>
                    <div class="space-y-3 mb-8">
                        <button onClick={startNewChat} class="flex gap-4 items-center w-full">
                            <HiOutlinePencilSquare size={20}/> New chat
                        </button>
                        <button class="flex gap-4 items-center w-full">
                                <HiSearch size={20}/> Search
                        </button>
                        <button class="flex gap-4 items-center w-full">
                                <HiOutlineCog size={20}/> Settings
                        </button> 
                    </div>
                    <details class="overflow-y-auto mb-8 flex-1 cursor-pointer">
                        <summary class="flex gap-4 items-center w-full mb-3">
                                <HiOutlineChatAlt2 size={20}/> Chats
                        </summary>
                        {
                            tabs.map((tab) => (
                                <ul key={tab.id}>
                                    {
                                        typeof tab.content === 'string' ? 
                                        (<p onChange={() => setActiveTab(tab.id)} class={`flex gap-2 items-center w-full text-left px-4 py-2 mb-2 rounded ${activeTab === tab.id ? "bg-gray-600 text-white" : "hover:bg-gray-200 hidden"}`}>
                                            {tab.content}
                                        </p>) : 
                                        tab.content.map((item) => (
                                            <button key={item.sessionId} 
                                                onClick={() => fetchPastAnswers(item.answers, item.sessionId)} 
                                                onChange={() => setActiveTab(tab.id)} class={`flex gap-2 items-center w-full text-left px-2 py-2 mb-2 rounded ${activeTab !== tab.id ? "hidden" : currentSessionId === item.sessionId ? "bg-blue-600 text-white" : "bg-[#f0f0f0] hover:bg-gray-200"}`}>
                                            {item.headline.length > 34 ? `${item.headline.slice(0, 34)}...` : item.headline}
                                            </button>
                                        ))
                                    }
                                </ul>
                            ))
                        }
                    </details>
                    <button class="flex gap-3 items-center w-full border-t border-gray-300 pt-2 mt-auto" onClick={() => setLogoutModal(true)}>
                        <img src={user?.photoURL || headshot} alt="" class="rounded-md w-8 h-full object-cover"/>
                        <div>
                            <h2 class="text-sm font-semibold text-left">{user?.displayName || 'Abdullah'}</h2>
                            <h2 class="text-sm">{user?.email || 'Abdullah'}</h2>
                        </div>
                    </button>
                    <Modal show={logoutModal} onClose={() => setLogoutModal(false)}>
                        <button onClick={loggingOut} class={`flex gap-3 items-center text-black px-2 py-2 rounded-md`}>
                            Logout <HiOutlineLogout size={20}/> 
                        </button>
                    </Modal>
                </aside>
            ) : (
                <aside class="w-fit bg-white shadow-lg p-4 flex flex-col justify-between">
                    <div class="relative flex flex-col flex-1 gap-6 gap-10 ">
                        <button class="" onClick={() => setTabPaneOpen(!tabPaneOpen)}>
                            <HiMenu size={20} class=" left-60 top-6"/>
                        </button>
                        <button>
                            <HiOutlinePencilSquare size={20}/>
                        </button>
                        <button>
                            <HiSearch size={20}/>
                        </button>
                        <button>
                            <HiOutlineCog size={20}/>
                        </button>
                        
                    </div>
                    <img src={user?.photoURL || headshot} alt="" class="rounded-full w-12 object-cover"/>
                </aside>
            )

        }
        </>
    )
}

const Modal = ({ show, onClose, children }) => {

    useEffect(() => {
        const handleClick = (e) => {if (!e.target.closest('.modal-content')) onClose()}

        document.addEventListener('mousedown', handleClick) 
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [show, onClose])

    if (!show) return null

    return (
        <div className="absolute bottom-18 left-0 items-center justify-center bg-opacity-50 z-50">
            <div className="modal-content bg-white px-6 rounded-lg shadow-lg w-44">
                <div className="">{children}</div>
            </div>
        </div>
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