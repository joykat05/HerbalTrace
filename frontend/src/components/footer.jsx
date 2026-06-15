import '../app.css'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer(){
    return(
        <>
        <div className="bg-green-300 text-white p-2 h-1/2 ml-4 mr-4 mt-2 mb-2 rounded-4xl text-center font-prompt">
        <div className='flex gap-4 items-center justify-center mt-2 mb-0 p-0'>
            <a 
                href="https://github.com/joykat05/HerbalTrace.git" 
                target="_blank" 
                className=" hover:text-green-600 transition flex items-center justify-center gap-2"
            >
                <FaGithub size={22} />
                 GitHub
            </a>
            <a 
                href="https://in.linkedin.com/" 
                target="_blank" 
                className=" hover:text-green-600 transition flex items-center justify-center gap-2"
            >
                <FaLinkedin size={22} />
                 Linkedin
            </a>
            <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                className=" hover:text-green-600 transition flex items-center justify-center gap-2"
            >
                <FaInstagram size={22} />
                 Instagram
            </a>
            </div>
            <br/>
            <h2 className='text-xl text-center'>© 2026 HerbalTrace : Batch Traceability & Management System</h2>
        </div>
        </>
    )
}