import { IdeaModule } from './features/Idea.jsx'
import { SpecModule } from './features/Spec.jsx'

export const Workspace = ({ activeChat }) => {
    return (
        <main class="flex-1 p-8 overflow-y-auto">
            {activeChat === "idea" && <IdeaModule/>}
            {activeChat === "spec" && <SpecModule/>}
        </main>
    )
}