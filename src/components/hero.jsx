import ideaRefine from '../assets/imgs/idea_refinement.png'
import landingP from '../assets/imgs/landing_page.png'
import prd from '../assets/imgs/prd_generator.png'
import pitch from '../assets/imgs/pitch_deck.png'
import milestone from '../assets/imgs/milestone.png'
import competitor from '../assets/imgs/competitor.png'



export const Hero = () => {

    const features = [
        {
            img: ideaRefine, 
            text: 'Share your startup idea in plain English. StartLean refines it using proven frameworks like Lean Canvas, suggesting names, slogans, and even domain availability to sharpen your vision before you build.'
        }, 
        {
            img: landingP, 
            text: 'Turn your refined idea into a beautiful, responsive landing page. Powered by Figma API, and exportable to Webflow or HTML/CSS—complete with compelling copy and structured sections.', 
        }, 
        {
            img: prd,
            text: 'Automatically generate a detailed Product Requirements Document. Break your big idea into clear user stories, milestones, and tasks—tailored to your skills and tech stack—for faster, smarter development.',
        }, 
        {
            img: pitch, 
            text: 'Craft investor-ready pitch decks in minutes. Get tailored slides for Problem, Solution, TAM, Team, and more—customized by funding stage and exportable to Google Slides or PDF.'
        }, 
        {
            img: competitor, 
            text: 'Instantly uncover your competition. StartLean scans the web for similar products, compares pricing and features, and gives you a clear edge with suggested differentiation strategies.'
        }, 
        {
            img: milestone, 
            text: 'Keep your launch on track with a goal-driven milestone tracker. Your AI co-founder monitors progress, gives feedback, and ensures your MVP hits the market faster.'
        }
    ]


    return (
        <>
            <div class="w-full bg-white px-5 md:px-10 lg:px-20 mt-10">
                <div class="w-full lg:w-[80%] bg-[url('./assets/imgs/heroImg.jpg')] bg-cover bg-center h-[40vh] h-[60vh] md:h-[80vh] m-auto flex flex-col justify-center lg:justify-end p-4 lg:p-10 gap-7 lg:gap-14 rounded-2xl bg-blue-900 text-white">
                    <p class="text-4xl md:text-5xl font-semibold z-4 relative w-full md:w-[60%] md:leading-15">Turn Your Startup Idea to A Working Business MVP in Minutes</p>
                    <p class="text-2xl">Get specs, decks, designs and competitor research --- All in one place</p>
                    <button class="px-4 py-2 bg-blue-700 text-white rounded-3xl hover:bg-blue-100 hover:text-blue-900 w-fit text-xl font-semibold">Get Started for Free</button>
                </div>
                <div class="w-full lg:w-[80%] m-auto mt-5 h-full">
                    <p class="text-4xl font-semibold py-5 my-3 text-center">All-in-One Startup Toolkit</p>
                    <p class="text-xl text-center">Empowering founders with AI-driven tools for every stage of their startup toolkit</p>
                    <div class="w-full" id="scroll-container">
                        <div class="flex overflow-x-scroll py-10 text-xl text-center text-blue-900" id="scroll-content">
                            {
                                features && features.map((feature, index) => (
                                    <div class={`flex flex-col items-center basis-1/2 min-w-full px-8 lg:px-5 mx-0`} id="item" key={index}>
                                        <img src={feature.img} alt="" class="bg-linear-to-t from-sky-500 to-indigo-500 w-[300px]" />
                                        <p class="text-center w-full md:w-[70%] m-auto">{feature.text}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}