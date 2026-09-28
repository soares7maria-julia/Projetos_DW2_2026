import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Este componente é onde a REGRA DE AUTORIZAÇÃO da página restrita é
// aplicada: só passa para frente (renderiza "children") quem tem uma
// sessão autenticada válida. Enquanto o estado da sessão ainda está sendo
// verificado, mostramos um carregamento em vez de liberar ou bloquear
// precipitadamente.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading-screen">
        <span className="spinner" />
        <span>Verificando sessão...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    // "replace" evita que a página restrita fique no histórico do
    // navegador, então o botão "voltar" não a exibe após o redirecionamento.
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
