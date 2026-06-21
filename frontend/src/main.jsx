import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export function Root() {   // 👈 add export
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return <App dark={dark} setDark={setDark} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)