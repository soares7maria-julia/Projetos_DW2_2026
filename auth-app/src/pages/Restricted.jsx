import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Só é possível chegar aqui através do ProtectedRoute, que já garantiu que
// existe uma sessão autenticada válida.
export default function Restricted() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="card">
      <h1>🎉 Área restrita ebaaaa!! 🎉</h1>
      <p>Esta página só é visível para quem está autenticado.</p>

      <div className="user-badge">
        <span>👤</span>
        <span>{user?.email}</span>
      </div>

      <button className="btn-secondary" style={{ marginTop: '1.5rem' }} onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  )
}
