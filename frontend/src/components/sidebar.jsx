import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isAdmin } from "../utils/auth";
export default function Sidebar(){
    const [show,setshow] = useState(false);
    const navigate = useNavigate();
        const admin = isAdmin();
    const handlelogout  = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return(
        <>
        {/* Dark backdrop over dashboard, only below lg, only when sidebar is open */}
        {show && (
            <div
                onClick={() => setshow(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
            />
        )}

        <div className="sticky top-0 h-screen flex gap-0 p-2 max-lg:p-1 items-start z-40">
        <div className={`h-full bg-green-950/75 dark:bg-green-950/80 rounded-2xl text-green-300 transition-[width] duration-300 overflow-hidden flex-col flex
        ${show
            ? "w-64 max-md:w-56 max-lg:fixed max-lg:left-2 max-lg:top-2 max-lg:h-[calc(100vh-1rem)] max-lg:shadow-2xl max-lg:shadow-black/50"
            : "w-0"}`}
        >
        <div className="flex-1">
            {admin && (
         <p className="font-prompt text-2xl max-md:text-lg p-2 mt-2 ">
            <Link to="/batches" className="flex items-start gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200 ">
        <span className="material-symbols-outlined "
            style = {{fontSize : "30px"}}>
                list_alt_check
            </span>
        Batch Mangement</Link></p> )}
        {admin && (
            <p className="font-prompt text-2xl max-md:text-lg p-2 mt-2 ">
            <Link to="/addbatch" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200 ">
        <span className="material-symbols-outlined "
            style = {{fontSize : "30px"}}>
                add_circle
            </span>
        Add Batch</Link></p> )}
        {admin && (
        <p className="font-prompt text-2xl max-md:text-lg p-2 mt-2">
            <Link to="/certificates" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        domain_verification
                    </span>
                     Add Certificate
                </Link></p> )}
        <p className="font-prompt text-2xl max-md:text-lg p-2 mt-2">
            <Link to="/dispatch" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        delivery_truck_speed
                    </span>
                     Add Dispatch
                </Link></p> 

         <p className="font-prompt text-2xl max-md:text-lg p-2 mt-2">
            <Link to="/trackbatch" className="flex items-center gap-2 hover:text-pink-300 hover:animate-pulse transition-all duration-200">
                <span className="material-symbols-outlined "
                    style = {{fontSize : "30px"}}>
                        conversion_path
                    </span>
                     Track Batches
                </Link></p> 

            </div>
                <button onClick={handlelogout} className="m-8 p-2 bg-green-400/90 text-white font-prompt text-xl max-md:text-lg rounded-2xl hover:scale-105 hover:bg-white hover:text-green-400 transition-all duration-300">
                Logout</button>
            
        </div>
       <button
 className={`ml-2 max-lg:ml-1 z-50 ${
    show ? "max-lg:fixed max-lg:left-[17rem] max-lg:top-3 max-md:left-[15em]" : ""
 }`}
onClick={() => setshow(prev => !prev)} >
    <span className="material-symbols-outlined text-green-300/90 border-2 bg-green-950/80 rounded-sm hover:text-pink-300/90 text-[30px]! max-md:text-[20px]!"
    >
        menu
    </span>
</button>
        </div>
        </>
    );
}