import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import Features from './components/feature'
import About from './about'
import MainLayout from './mainlayout'
import Login from './login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="login" element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App