import { useState } from "react";
import { ProductGrid } from "./components/ProductGrid";
import "./App.css";

const produtos = [
  { id: 1, nome: "MacBook Air M3",    categoria: "notebook", preco: 9499,  icon: "laptop",         cor: "#00f2ff" },
  { id: 2, nome: "Dell XPS 15",       categoria: "notebook", preco: 12499, icon: "laptop-minimal", cor: "#00ff9d" },
  { id: 3, nome: "iPhone 15 Pro",     categoria: "celular",  preco: 7299,  icon: "smartphone",     cor: "#ff00e5" },
  { id: 4, nome: "Pixel 9 Pro",       categoria: "celular",  preco: 6999,  icon: "smartphone",     cor: "#a855f7" },
  { id: 5, nome: "AirPods Max",       categoria: "audio",    preco: 5990,  icon: "headphones",     cor: "#7000ff" },
  { id: 6, nome: "Sony WH-1000XM5",   categoria: "audio",    preco: 3299,  icon: "headphones",     cor: "#06b6d4" },
  { id: 7, nome: "Apple Watch Ultra", categoria: "wearable", preco: 6499,  icon: "watch",          cor: "#ff4d00" },
  { id: 8, nome: "Garmin Fenix 7",    categoria: "wearable", preco: 5499,  icon: "watch",          cor: "#10b981" },
];

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [busca, setBusca] = useState("");

  const filtrados = produtos
    .filter(p => categoriaAtiva === "todos" || p.categoria === categoriaAtiva)
    .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="container">
      <header className="header">
        <span className="badge">New Collection 2026</span>
        <h1 className="title">Smart<span>Catalog</span></h1>
        <p className="subtitle">
          Exibindo {filtrados.length} produto{filtrados.length !== 1 ? "s" : ""}
        </p>

        <div className="controls">
          <select
            className="filter-select"
            value={categoriaAtiva}
            onChange={(e) => setCategoriaAtiva(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="notebook">Notebook</option>
            <option value="celular">Celular</option>
            <option value="audio">Áudio</option>
            <option value="wearable">Wearable</option>
          </select>

          <input
            className="search-input"
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </header>

      {filtrados.length === 0 ? (
        <p className="empty-state">
          Nenhum produto encontrado para "{busca}" em{" "}
          {categoriaAtiva === "todos" ? "todas as categorias" : categoriaAtiva}.
        </p>
      ) : (
        <ProductGrid items={filtrados} />
      )}

      <footer className="footer">
        <p>Material Didático | Prof. Rafael Liberato</p>
      </footer>
    </div>
  );
}