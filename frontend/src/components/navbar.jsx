import '../app.css'
import { Link } from 'react-router'

function Navbar({ dark, setDark }) {
  console.log("Navbar dark:", dark);
  return (
    <>
      <div   data-theme={dark ? "dark" : "light"}
      className=" bg-green-300 dark:bg-green-900 text-white dark:text-green-200 p-2 max-md:p-1 ml-4 mr-4 mt-2 flex items-center  rounded-4xl font-prompt">
        <div className="flex items-center">
          <span 
            className="material-symbols-outlined m-3 max-md:m-1 text-pink-400" 
            style={{ fontSize: "40px" }}
          >
            local_florist
          </span>

          <Link to="/">
            <h1 className="text-3xl max-md:text-lg leading-none hover:text-green-600 dark:hover:text-white ">
              HerbalTrace
            </h1>
          </Link>
        </div>

        <div className="text-2xl mx-auto flex items-center   gap-4 max-md:gap-2 max-md:text-sm">
          <Link to="/features">
            <button className=" hover:text-green-600 p-2 max-md:p-1 rounded-lg flex items-center dark:hover:text-white  ">
              Features
            </button>
          </Link>

          <Link to="/about">
            <button className=" hover:text-green-600 p-2 max-md:p-1 rounded-lg flex items-center dark:hover:text-white">
              About
            </button>
          </Link>

          <Link to="/login">
            <button className=" hover:text-green-600 p-2 max-md:p-1 rounded-lg flex items-center dark:hover:text-white
            ">
              Log in
            </button>
          </Link>
         
        </div>
         
        {/* RIGHT: profile icon */}
        <div className="ml-auto flex items-center gap-5">
          <span
      onClick={() => {
  console.log("before:", dark);
  setDark(prev => !prev);
}}
      className="material-symbols-outlined cursor-pointer hover:text-green-600 dark:hover:text-white"
      style={{ fontSize: "30px" }}
    >
      {dark ? "light_mode" : "dark_mode"}
    </span>
          <span 
            className="material-symbols-outlined hover:text-green-600 dark:hover:text-white" 
            style={{ fontSize: "40px" }}
          >
            account_circle
          </span>
        </div>

      </div>
    </>
  )
}

export default Navbar