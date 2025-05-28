import { FaLinkedin, FaXTwitter, FaFacebook } from 'react-icons/fa6'




export const Footer = () => {
    return (
        <>
            <div className="bg-[#f0f0f0] w-full text-black px-20 mt-40 flex flex-col justify-between items-center gap-10 py-30">
                <div class="flex gap-60 text-3xl">
                    <p>About</p>
                    <p>Contact</p>
                    <p>Terms</p>
                </div>
                <div class="flex gap-10 text-2xl">
                    <FaLinkedin />
                    <FaXTwitter />
                    <FaFacebook />
                </div>
            </div>
        </>
    )
}