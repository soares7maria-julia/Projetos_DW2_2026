import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    // Após encerrar a sessão, envia o usuário para o login. Como o
    // ProtectedRoute passa a barrar a página restrita assim que a sessão
    // some, não é possível voltar a vê-la pelo botão "voltar" do navegador.
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Trabalho Autenticação
      </Link>
      <div className="navbar-links">
        <Link to="/">Início</Link>
        {isAuthenticated ? (
          <>
            <Link to="/restrita">Área restrita</Link>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{user?.email}</span>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  )
}
