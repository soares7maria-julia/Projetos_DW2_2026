import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Página pública: acessível a qualquer visitante, autenticado ou não.
// Continua disponível antes do login, depois do login e depois do logout.
export default function Public() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="card card-wide hero">
      <h1>Bem-vindo(a)</h1>
      <p>
        Esta é a página pública da aplicação, construída em React com autenticação real
        via Supabase Auth. Qualquer pessoa pode visualizá-la, esteja ou não conectada.
      </p>
      <p>
        O objetivo deste projeto é demonstrar o controle de acesso a rotas: a página
        restrita só pode ser vista por quem tiver uma conta e estiver com sessão ativa.
      </p>

      <div className="hero-actions">
        {isAuthenticated ? (
          <Link className="btn-primary" to="/restrita" style={{ textDecoration: 'none' }}>
            Ir para a área restrita
          </Link>
        ) : (
          <>
            <Link className="btn-primary" to="/login" style={{ textDecoration: 'none' }}>
              Entrar
            </Link>
            <Link className="btn-secondary" to="/cadastro" style={{ textDecoration: 'none' }}>
              Criar conta
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
