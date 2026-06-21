import '../app.css'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer(){
    return(
        <>
        <div className="
            bg-green-300 text-white 
            p-2 max-md:p-1  
            ml-4 mr-4 mt-2 mb-2 
            rounded-4xl 
            text-center 
            font-prompt
            dark:bg-green-900
            dark:text-green-200
        ">
            <div className="
                flex items-center justify-center gap-4 
                mt-2 mb-0 p-0
                max-md:gap-2
                max-md:text-xs
            ">
                <a 
                    href="https://github.com/joykat05/HerbalTrace.git" 
                    target="_blank" 
                    className="hover:text-green-600 transition flex items-center justify-center gap-2 max-md:gap-1"
                >
                    <FaGithub size={22} className="max-md:text-[16px]" />
                    GitHub
                </a>
                <a 
                    href="https://in.linkedin.com/" 
                    target="_blank" 
                    className="hover:text-green-600 transition flex items-center justify-center gap-2 max-md:gap-1"
                >
                    <FaLinkedin size={22} className="max-md:text-[16px]" />
                    Linkedin
                </a>
                <a 
                    href="https://www.instagram.com/" 
                    target="_blank" 
                    className="hover:text-green-600 transition flex items-center justify-center gap-2 max-md:gap-1"
                >
                    <FaInstagram size={22} className="max-md:text-[16px]" />
                    Instagram
                </a>
            </div>
            <h2 className="
                text-xl 
                max-md:text-xs 

                mt-2
            ">
                © 2026 HerbalTrace : Batch Traceability & Management System
            </h2>

        </div>
        </>
    )
}