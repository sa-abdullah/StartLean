import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './client/pages/App.jsx'
import AuthForm from './client/pages/authform.jsx'
import Dashboard from './client/pages/Dashboard.jsx'
import {AuthProvider} from './client/components/globalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/auth" element={<AuthForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
         </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
