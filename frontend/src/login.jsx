import './app.css'
import Card from './components/card'

export default function Login(){
    return(
        <>
        <div className="justify-center items-center flex m-10 p-4 bg-gray-100 rounded-2xl">
        <Card title={
                <div className="flex items-center gap-2">
                    Log In
                <span className="material-symbols-outlined bg-green-300 text-white rounded-full p-2 text-[40px]">
                    login
                </span>
                
                </div>
            }>
            <form className=" p-6 w-full">
            <input
                type="email"
                placeholder="Enter Email"
                className="w-full border p-2 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
                type="password"
                placeholder="Enter Password"
                className="w-full border p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
                type="button"
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
            >
                Login
            </button>
            </form>
            <br/>
            <p className="text-sm text-center mt-3 text-gray-500">
                Don’t have an account?{" "}
                <span className="text-green-600 cursor-pointer">
                Sign up
                </span>
            </p>
        </Card>
        </div>
        </>
    )
}