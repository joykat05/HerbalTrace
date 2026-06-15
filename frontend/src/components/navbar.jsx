import '../app.css'
function Navbar() {

  return (
    <>
     <div className="bg-green-300 text-white p-2 h-1/2 ml-4 mr-4 mt-2 flex rounded-4xl items-center font-prompt">
     <span className="material-symbols-outlined m-3 text-pink-400"   style={{ fontSize: "40px" }}>local_florist</span>
      <h1 className=" text-3xl hover:text-green-600">HerbalTrace</h1>
      <div className="text-2xl mx-auto flex gap-4">
        <button className=" hover:text-green-600 text-white p-2 rounded-lg">Features</button>
        <button className=" hover:text-green-600 text-white p-2 rounded-lg">About</button>
        <button className=" hover:text-green-600 text-white p-2 rounded-lg">Log in</button>
      </div>
      <div className="text-2xl ml-auto ">
        <span className="material-symbols-outlined hover:text-green-600"   style={{ fontSize: "40px" }}>account_circle</span>
        </div>
     </div>
    </>
  )
}

export default Navbar
