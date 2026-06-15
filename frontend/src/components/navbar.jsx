import '../app.css'
import { Link } from 'react-router'

function Navbar() {
  return (
    <>
      <div className=" bg-green-300 text-white p-2 max-md:p-1ml-4 mr-4 mt-2 flex items-center  rounded-4xl font-prompt">
        <div className="flex items-center">
          <span 
            className="material-symbols-outlined m-3 max-md:m-1 text-pink-400" 
            style={{ fontSize: "40px" }}
          >
            local_florist
          </span>

          <Link to="/">
            <h1 className="text-3xl max-md:text-lg leading-none hover:text-green-600 ">
              HerbalTrace
            </h1>
          </Link>
        </div>

        <div className="text-2xl mx-auto flex items-center   gap-4 max-md:gap-2max-md:text-sm">
          <Link to="/features">
            <button className=" hover:text-green-600 p-2 max-md:p-1 rounded-lg flex items-center   ">
              Features
            </button>
          </Link>

          <Link to="/about">
            <button className=" hover:text-green-600 p-2 max-md:p-1 rounded-lg flex items-center">
              About
            </button>
          </Link>

          <Link to="/login">
            <button className=" hover:text-green-600 p-2 max-md:p-1 rounded-lg flex items-center
            ">
              Log in
            </button>
          </Link>
        </div>

        {/* RIGHT: profile icon */}
        <div className="ml-auto flex items-center">
          <span 
            className="material-symbols-outlined hover:text-green-600" 
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