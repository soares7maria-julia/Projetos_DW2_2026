import { Route, Routes } from "react-router";
import Cabecalho from "./components/Cabecalho";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import Inicio from "./pages/Inicio";
import ListaFilmes from "./pages/ListaFilmes";
import Favoritos from "./pages/Favoritos";
import DetalheFilme from "./pages/DetalheFilme";

export default function App() {
  return (
    <>
      <Cabecalho />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/filmes" element={<ListaFilmes />} />
        <Route path="/filmes/:id" element={<DetalheFilme />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
    </>
  );
}