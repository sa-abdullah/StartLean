import { HiOutlineLightBulb, HiOutlinePresentationChartBar, HiOutlineBadgeCheck } from "react-icons/hi"
import { FaRegFileAlt, FaUserSecret, FaPalette } from "react-icons/fa"


export const Sidebar = ({ activeTab, setActiveTab }) => {


    const tabs = [
        { id: 'idea', label: 'Idea Research', icon: <HiOutlineLightBulb/>}, 
        { id: 'spec', label: 'Product Spec Writer', icon: <FaRegFileAlt/>}, 
        { id: 'pitch', label: 'Pitch Deck Generator', icon: <HiOutlinePresentationChartBar/>}, 
        { id: 'competitor', label: 'Competitor Research', icon: <FaUserSecret/>}, 
        { id: 'landing page', label: 'Landing Page Designer', icon: <FaPalette/> }, 
        { id: 'validator', label: 'Idea Validation', icon: <HiOutlineBadgeCheck/>}

    ]



    return (
        <aside class="w-70 bg-white shadow-lg p-6">
            <h2 class="text-xl font-bold mb-6">Abdullah</h2>
            <ul>
                {
                    tabs.map((tab) => (
                        <li key={tab.id}>
                            <button onClick={() => setActiveTab(tab.id)} class={`flex gap-2 items-center w-full text-left px-4 py-2 mb-2 rounded ${activeTab === tab.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}>
                                {tab?.icon}
                                {tab.label} 
                                
                            </button>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}