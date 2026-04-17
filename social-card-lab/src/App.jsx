import { ProfileCard } from './components/ProfileCard';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Minha Rede de Contatos</h1>
        <p>Conectando talentos no universo tech</p>
      </header>

      <div className="cards-grid">
        {/* Usando o componente quatro vezes em uma linda grade */}
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
}