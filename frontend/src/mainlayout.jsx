import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function MainLayout({ dark, setDark }) {
  return (
   <div className="flex flex-col min-h-screen">
    <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10
        dark:brightness-40"
        style={{ backgroundImage: "url('/content/home-bg-img.jpg')" }}
      />
      <Navbar dark={dark} setDark={setDark} />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;