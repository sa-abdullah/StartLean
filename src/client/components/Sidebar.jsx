import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLightBulb, HiOutlinePresentationChartBar, HiOutlineBadgeCheck, HiMenu, HiSearch, HiOutlineCog, HiOutlineChatAlt2, HiOutlineLogout, HiOutlinePencilAlt, HiOutlineCollection, HiOutlinePhotograph } from "react-icons/hi"
import { FaRegFileAlt } from "react-icons/fa"
import { useGlobal } from './globalContext'
import headshot from '../assets/imgs/headshot.jpg'
import Favicon from '../assets/imgs/favicon.png'


export const Sidebar = ({ activeChat, setActiveChat }) => {
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
                <aside class="relative w-80 bg-white shadow-lg p-4 h-full flex flex-col">
                    <div class="relative flex justify-between mb-8">
                        <img src={Favicon} alt="" class="w-5 object-cover"/>
                        <button class="" onClick={() => setTabPaneOpen(!tabPaneOpen)}>
                            <HiMenu size={20} class=" left-60 top-6"/>
                        </button>
                    </div>
                    <div class="space-y-2 mb-8">
                        <button onClick={startNewChat} class="flex gap-4 items-center w-full hover:bg-[#f0f0f0] p-2">
                            <HiOutlinePencilAlt size={20}/> New chat
                        </button>
                        <button class="flex gap-4 items-center w-full hover:bg-[#f0f0f0] p-2">
                                <HiSearch size={20}/> Search
                        </button>
                        <button class="flex gap-4 items-center w-full hover:bg-[#f0f0f0] p-2">
                                <HiOutlineCog size={20}/> Settings
                        </button> 
                    </div>
                    <details class="relative overflow-y-auto mb-8 flex-1 cursor-pointer">
                        <summary class="flex gap-4 items-center w-full mb-3 sticky bg-white top-0 py-2  px-2 hover:bg-[#f0f0f0]">
                                <HiOutlineChatAlt2 size={20}/> Chats
                        </summary>
                        {
                            tabs.map((tab) => (
                                <div key={tab.id}>
                                    {
                                        typeof tab.content === 'string' ? 
                                        (<p onChange={() => setActiveChat(tab.id)} class={`flex gap-2 items-center w-full text-left px-4 py-2 mb-2 rounded ${activeChat === tab.id ? "bg-gray-600 text-white" : "hover:bg-gray-200 hidden"}`}>
                                            {tab.content}
                                        </p>) : 
                                        tab.content.map((item) => (
                                            <button key={item.sessionId} 
                                                onClick={() => fetchPastAnswers(item.answers, item.sessionId)} 
                                                onChange={() => setActiveChat(tab.id)} class={`flex gap-2 items-center w-full text-left px-2 py-2 rounded indent-3 ${activeChat !== tab.id ? "hidden" : currentSessionId === item.sessionId ? "bg-gray-300" : "hover:bg-gray-100"}`}>
                                                {item.headline.length > 25 ? `${item.headline.slice(0, 25)}...` : item.headline}
                                            </button>
                                        ))
                                    }
                                </div>
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
                            <HiOutlinePencilAlt size={20}/>
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

export const TopNav = ({ activeChat, setActiveChat }) => {

    const tabs = [
        { id: 'idea', label: 'Research Idea', icon: <HiOutlineLightBulb/>}, 
        { id: 'spec', label: 'Product Spec', icon: <FaRegFileAlt/>}, 
        { id: 'pitch', label: 'Pitch Deck', icon: <HiOutlinePresentationChartBar/>}, 
        { id: 'competitor', label: 'Find Competitors', icon: <HiOutlineCollection/>}, 
        { id: 'landing page', label: 'Landing Page', icon: <HiOutlinePhotograph/> }, 
        { id: 'validator', label: 'Validate Idea', icon: <HiOutlineBadgeCheck/>}
    ]

    return (
        
        <div class="flex min-w-auto items-center bg-white">
            {tabs.map((tab, index) => {
                return (
                    <button key={index} onClick={() => setActiveChat(tab.id)} class={`flex gap-2 items-center w-full h-full text-left px-4 py-2 border-r-1 border-gray-400  ${activeChat === tab.id ? "bg-gray-100" : "hover:bg-gray-200"}`}>
                        <p class="text-sm">{tab?.icon}</p>
                        <p class="text-sm no-wrap">{tab?.label}</p>
                    </button>
                )
            })}
        </div>
    )
}