import { IdeaModule } from './Idea.jsx'
import { SpecModule } from './Spec.jsx'

export const Workspace = ({ activeTab }) => {
    return (
        <main class="flex-1 p-8">
            {activeTab === "idea" && <IdeaModule/>}
            {activeTab === "spec" && <SpecModule/>}
        </main>
    )
}