import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    // Let the browser finish writing localStorage
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 100);

  }, [navigate]);

  return(
    <>
    <div className="flex justify-center items-center bg-white/80 text-pink-200
        animate-pulse
        transition duration-150 ease-in-out
        dark:brightness-50">
    <span className="material-symbols-outlined"
    style={{ fontSize : 80 }}>
          local_florist
    </span>
    <p style={{ fontSize : 40 }}>Signing you in....</p>

    </div>
    </>
  );
}