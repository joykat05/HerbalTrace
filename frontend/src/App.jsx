import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import Features from './components/feature'
import About from './about'
import MainLayout from './mainlayout'
import Login from './login'
import Signup from './signup'
import Demo from './demo'

function App({ dark, setDark }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout dark={dark} setDark={setDark} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="demo" element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App