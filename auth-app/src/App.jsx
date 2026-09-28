import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Public from './pages/Public'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Restricted from './pages/Restricted'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Public />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Signup />} />
              <Route
                path="/restrita"
                element={
                  <ProtectedRoute>
                    <Restricted />
                  </ProtectedRoute>
                }
              />
              {/* Qualquer rota desconhecida volta para a página pública */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
