import { useState } from "react";
import { Link } from "react-router-dom";
export default function Dashboard(){
    const [show,setshow] = useState("true");
    return(
        <>

        <div className="flex gap-2 items-start m-5"> 
        <div className= {`h-screen bg-green-950/75 dark:bg-green-950/80 rounded-2xl text-green-300 transition-all duration-700 overflow-hidden ${show? "w-64" : "w-0" }`} >
        
            <p className="font-prompt text-2xl p-2 mt-2 ">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
        <span className="material-symbols-outlined "
            style = {{fontSize : "30px"}}>
                menu
            </span>
        Add Batch</Link></p>
        <p className="font-prompt text-2xl p-2 mt-2">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        menu
                    </span>
                     Add Certificate
                </Link></p>
        <p className="font-prompt text-2xl p-2 mt-2">
            <Link to="/" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        menu
                    </span>
                     Add Dispatch
                </Link></p> 
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