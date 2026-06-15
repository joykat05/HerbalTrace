import './app.css';
import Navbar from './components/navbar.jsx';
import Features from './components/feature.jsx';

export default function Home(){
    return(
        <>
        <Navbar />
        <div className="relative m-4">
            <img
                className="w-305 rounded-2xl"
                src="/content/home-photo-crop.jpg"
            />

            <div className="absolute top-[25%] left-1/2 w-250 text-center -translate-x-1/2 -translate-y-1/2r rounded-xl text-white  bg-green-400/60 p-4">
                <p className="text-4xl font-prompt">
                HerbalTrace : Batch Traceability & Management System
                </p>
                <p className='text-2xl font-prompt'>Track. Verify. Deliver. — all in one place</p>
                <button className="m-4 font-prompt border-2 border-white p-2 rounded-lg text-2xl transition duration-300 ease-out hover:bg-white hover:text-green-300 hover:scale-110">Start Now
                    <span className="material-symbols-outlined text-pink-500 ">local_florist</span>
                </button>
            </div>
            </div>
            <Features />
            
        </>
    );
}