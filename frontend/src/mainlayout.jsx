import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function MainLayout({ dark, setDark }) {
  return (
   <div className="flex flex-col min-h-screen">
      <Navbar dark={dark} setDark={setDark} />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;