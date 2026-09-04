import { describe, expect, it } from "vitest";
import {
  atualizarStatusReserva,
  encontrarReservaPorId,
  encontrarSalaPorId,
  reservas,
  reservasDaSala,
} from "./reservas";

describe("consultas de reservas", () => {
  it("encontra uma reserva pelo id usado na URL", () => {
    expect(encontrarReservaPorId(reservas, "res-03")).toMatchObject({
      id: "res-03",
      salaId: "sala-02",
    });
  });

  it("devolve undefined para uma reserva ausente", () => {
    expect(encontrarReservaPorId(reservas, "res-99")).toBeUndefined();
  });

  it("encontra uma sala pelo id usado na URL", () => {
    expect(encontrarSalaPorId("sala-01")).toMatchObject({
      id: "sala-01",
      nome: "Sala 101",
    });
  });

  it("lista somente as reservas de uma sala", () => {
    const resultado = reservasDaSala("sala-02", reservas);

    expect(resultado).toHaveLength(2);
    expect(resultado.every((reserva) => reserva.salaId === "sala-02")).toBe(true);
  });
});

describe("atualizarStatusReserva", () => {
  it("atualiza somente a reserva indicada sem mutar a lista original", () => {
    const resultado = atualizarStatusReserva(reservas, "res-03", "concluída");

    expect(resultado).not.toBe(reservas);
    expect(resultado.find((reserva) => reserva.id === "res-03").status).toBe("concluída");
    expect(reservas.find((reserva) => reserva.id === "res-03").status).toBe("em andamento");
  });

  it("mantém a lista quando o status não é permitido", () => {
    expect(atualizarStatusReserva(reservas, "res-03", "aguardando")).toBe(reservas);
  });
});
