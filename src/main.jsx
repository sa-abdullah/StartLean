import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './index.css'
import App from './pages/App.jsx'
import AuthForm from './pages/authform.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/auth" element={<AuthForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
       </Routes>
    </BrowserRouter>
  </StrictMode>
)
