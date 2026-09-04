import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(cleanup);

function renderizarAplicacao(url) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Painel de Reservas", () => {
  it("mostra o resumo na rota inicial", () => {
    renderizarAplicacao("/");

    expect(screen.getByRole("heading", { name: "Reservas de salas" })).not.toBeNull();
  });

  it("mostra uma mensagem de retorno para reserva inexistente", () => {
    renderizarAplicacao("/reservas/res-99");

    expect(screen.getByRole("heading", { name: "Reserva não encontrada" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Ver todas as reservas" }).getAttribute("href")).toBe(
      "/reservas",
    );
  });
});
