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
    <video
        className="w-full h-150 max-md:w-full max-md:h-[60vh] object-cover rounded-2xl block brightness-80 dark:brightness-50"
        src="/content/hero-video-2.mp4"
        autoPlay
        loop
        muted
        playsInline
    />

    <div className="
        absolute top-[40%] max-md:top-[50%] left-0 right-0
        -translate-y-1/2
        bg-green-200/90 dark:bg-green-950
        py-8 max-md:py-5
        text-green-800 text-center
        dark:text-green-200
        shadow-[0px_0px_51px_9px_rgba(171,248,210,0.9)]
        dark:shadow-[0px_0px_50px_15px_rgba(8,99,55,0.9)]
    ">
        <h1 className="font-prompt text-4xl max-md:text-xl leading-tight font-bold">
            HerbalTrace: Batch Traceability & Management System
        </h1>
        <p className="font-prompt text-xl max-md:text-xs mt-2">
            Track. Verify. Deliver. — all in one place
        </p>
      <Link to="/signup" className="flex justify-center">
    <button className="
        m-4 max-md:m-2
        font-prompt border-2 border-white
        p-2 max-md:px-2 max-md:py-1
        rounded-lg text-2xl max-md:text-xs
        flex items-center justify-center gap-1
        transition duration-300 ease-out
        hover:bg-white hover:text-green-800 hover:scale-110
    ">
        Start Now
        <span className="material-symbols-outlined text-pink-500 text-[28px] max-md:text-[16px] leading-none">
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