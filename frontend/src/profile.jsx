import { Link } from "react-router";
export default function Profile(){
    return (
        <>
        <div className="bg-linear-to-r from-white to-green-300 p-2 dark:from-gray-300 dark:to-green-800 ">
        <Link to="/dashboard">
        <p className="text-sm mt-5 ml-5 underline text-pink-500">Back to Dashboard</p></Link>
        <div className="p-8 flex justify-baseline items-center gap-2 font-prompt">
        <div className="rounded-full w-16 h-16 bg-green-600 text-white flex justify-center items-center text-3xl">
            Ri
        </div>
        <p className="text-4xl text-green-600">Ria Kataria</p>
        </div>
        <hr className="mx-5"></hr>
        </div>
        </>
    );
}