import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import Features from './components/feature'
import About from './about'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App