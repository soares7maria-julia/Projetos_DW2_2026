// ProfileCard.jsx

// Usamos 'export' para tornar esta função pública para o resto do projeto
export const ProfileCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        {/* Placeholder para uma imagem legal depois */}
        <img src="<https://api.dicebear.com/7.x/avataaars/svg?seed=Padrão>" alt="Avatar Padrão" className="avatar" />
        <span className="status-badge" title="Status: online"></span>
      </div>
      <div className="card-body">
        <h3>Usuário Padrão</h3>
        <p className="role-chip">Desenvolvedor Full Stack</p>
      </div>
    </div>
  );
};