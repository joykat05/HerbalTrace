import { useState } from "react";
import { Link } from "react-router-dom";
export default function Sidebar(){
    const [show,setshow] = useState(true);
    return(
        <>

        <div className="flex gap-2 items-start m-5"> 
        <div className= {`h-full bg-green-950/75 dark:bg-green-950/80 rounded-2xl text-green-300 transition-all duration-700 overflow-hidden flex-col flex ${show? "w-64" : "w-0" }`} >
        <div className="flex-1">
            <p className="font-prompt text-2xl p-2 mt-2 ">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200 ">
        <span className="material-symbols-outlined "
            style = {{fontSize : "30px"}}>
                add_circle
            </span>
        Add Batch</Link></p>
        <p className="font-prompt text-2xl p-2 mt-2">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        domain_verification
                    </span>
                     Add Certificate
                </Link></p>
        <p className="font-prompt text-2xl p-2 mt-2">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        delivery_truck_speed
                    </span>
                     Add Dispatch
                </Link></p> 

         <p className="font-prompt text-2xl p-2 mt-2">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        conversion_path
                    </span>
                     Track Batches
                </Link></p> 

            </div>
                <button className="m-8 p-2 bg-green-400/90 text-white font-prompt text-2xl rounded-2xl hover:scale-105 hover:bg-white hover:text-green-400 transition-all duration-300">Logout</button>
            
        </div>
        <button onClick={() => setshow(prev => !prev)} >
            <span className="material-symbols-outlined text-green-300/90 border-2 bg-green-950/80 rounded-sm hover:text-pink-300/90"
            style = {{fontSize : "30px"}}>
                menu
            </span>
        </button>
        </div>
        </>
    );
}