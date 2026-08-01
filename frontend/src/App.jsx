import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import Features from './components/feature'
import About from './about'
import MainLayout from './mainlayout'
import Login from './login'
import Signup from './signup'
import Demo from './demo'
import Dashboard from './dashboard'
import Batchform from './batchform'
import Batches from './batches'
import CompleteProfile from "./CompletePeofile";
import OAuthSuccess from "./OAuthSuccess"
import Certificate from './AddCertificate'
import DispatchForm from './AddDispatch'
import AIInsights from './Aifeature'
import Profile from './profile'
import ViewCert from './ViewCert'
import TrackBatch from './TrackBatch'

function App({ dark, setDark }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout dark={dark} setDark={setDark} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="login" element={<Login />} />
          <Route path="demo" element={<Demo />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addbatch" element={<Batchform />} />
          <Route path="batches" element={<Batches />} />
          <Route path="certificates" element={<Certificate />} />
           <Route path="certificates/:batchId" element={<Certificate />} />
          <Route path="dispatch" element={<DispatchForm />} />
          <Route path="dispatch/:batchId" element={<DispatchForm />} />
          <Route path="ai-insights" element={<AIInsights />} />
           <Route path="trackbatch" element={<TrackBatch />} />
           <Route path="trackbatch/:batchId" element={<TrackBatch />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/seecert/:batchId" element={<ViewCert />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/signup" element={<Signup />} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App