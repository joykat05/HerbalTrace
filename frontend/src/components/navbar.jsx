import '../app.css'
import { Link } from 'react-router'

function Navbar({ dark, setDark }) {


  return (
    <div
      data-theme={dark ? "dark" : "light"}
      className="bg-green-300 dark:bg-green-900 text-white dark:text-green-200 p-2 max-md:p-1 ml-4 mr-4 mt-2 flex items-center justify-between rounded-4xl font-prompt"
    >
      {/* LEFT */}
      <div className="flex items-center shrink-0">
        <span
          className="material-symbols-outlined m-3 max-md:m-1 text-pink-400 text-[40px] max-md:text-[28px]"
          style={{ fontSize: window.innerWidth < 768 ? "24px" : "40px" }}
        >
          local_florist
        </span>

        <Link to="/">
          <h1 className="text-3xl max-md:text-lg leading-none hover:text-green-600 dark:hover:text-white whitespace-nowrap">
            HerbalTrace
          </h1>
        </Link>
      </div>

      {/* MIDDLE (responsive shrink, NOT hidden) */}
      <div className="text-2xl flex items-center gap-4 max-md:gap-1 max-md:text-xs mx-2 max-md:mx-1 overflow-hidden">
        <Link to="/features">
          <button className="hover:text-green-600 p-2 max-md:p-1 max-md:text-[10px] max-md:px-1 rounded-lg dark:hover:text-white whitespace-nowrap">
            Features
          </button>
        </Link>

        <Link to="/about">
          <button className="hover:text-green-600 p-2 max-md:p-1 max-md:text-[10px] max-md:px-1 rounded-lg dark:hover:text-white whitespace-nowrap">
            About
          </button>
        </Link>

        <Link to="/login">
          <button className="hover:text-green-600 p-2 max-md:p-1 max-md:text-[10px] max-md:px-1 rounded-lg dark:hover:text-white whitespace-nowrap">
            Log in
          </button>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 max-md:gap-1 shrink-0">
        <span
          onClick={() => setDark(prev => !prev)}
          className="material-symbols-outlined flex-shrink-0 cursor-pointer hover:text-green-600 dark:hover:text-white text-[30px] max-md:text-[20px]"
          style={{ fontSize: window.innerWidth < 768 ? "24px" : "40px" }}
        >
          {dark ? "light_mode" : "dark_mode"}
        </span>

        <span
          className="material-symbols-outlined flex-shrink-0 hover:text-green-600 dark:hover:text-white text-[40px] max-md:text-[24px]"
          style={{ fontSize: window.innerWidth < 768 ? "24px" : "40px" }}
        >
          account_circle
        </span>
      </div>
    </div>
  )
}

export default Navbar