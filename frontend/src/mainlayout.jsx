import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function MainLayout({ dark, setDark }) {
  return (
   <div className="flex flex-col min-h-screen">
    <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10
        brightness-80
        dark:brightness-40 blur-2xs"
        style={{ backgroundImage: "url('/content/home-bg-img.jpg')" }}
      />

      <div className="px-4 max-md:px-2 mt-2">
        <Navbar dark={dark} setDark={setDark} />
      </div>

      <main className="flex-grow px-4 max-md:px-2">
        <Outlet />
      </main>

      <div className="px-4 max-md:px-2">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;