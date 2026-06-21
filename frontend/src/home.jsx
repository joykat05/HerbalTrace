import './app.css';
import Navbar from './components/navbar.jsx';
import Features from './components/feature.jsx';
import About from './about.jsx';
import Footer from './components/footer.jsx';
import { Link } from 'react-router';

export default function Home(){
    return(
        <>
        <div className="relative m-4">
            <img
                className="w-305 max-md:w-full max-md:h-[60vh] object-cover rounded-2xl block dark:brightness-50"
                src="/content/home-photo-crop.jpg"
                alt="hero"
            />

            <div className="absolute top-[40%]  max-md:top-[50%]   left-1/2 w-250 max-md:w-[85%] text-center -translate-x-1/2 -translate-y-1/2 rounded-xl  text-white   bg-green-400/40 p-4 max-md:p-2 hover:scale-105 transition duration-200 ease-out
            dark:bg-green-900/60
            dark:text-green-200
            ">
                <p className="
                    text-4xl 
                    max-md:text-base 
                    leading-tight 
                    font-prompt
                ">
                    HerbalTrace : Batch Traceability & Management System
                </p>
                <p className="
                    text-2xl 
                    max-md:text-xs 
                    font-prompt
                ">
                    Track. Verify. Deliver. — all in one place
                </p>
                <Link to="/signup">
                <button className="
                    m-4 
                    max-md:m-2
                    mx-auto  
                    max-md:mx-auto
                    font-prompt 
                    border-2 border-white 
                    p-2 
                    max-md:px-2 max-md:py-1
                    rounded-lg 
                    text-2xl 
                    max-md:text-xs
                    flex items-center justify-center gap-1   
                    transition duration-300 ease-out 
                    hover:bg-white hover:text-green-300 hover:scale-110
                    hover:dark:bg-gray-800
                    hover:dark:text-green-600
                    dark:border-gray-800
                ">
                    Start Now
                    <span className="
                        material-symbols-outlined 
                        text-pink-500 
                        text-[28px] 
                        max-md:text-[16px]   
                        leading-none
                    ">
                        local_florist
                    </span>
                </button>
                </Link>
            </div>
        </div>

        <Features />
        <About />
        </>
    );
}