export const STATUS_RESERVA = [
  "confirmada",
  "em andamento",
  "concluída",
  "cancelada",
];

export const salas = [
  { id: "sala-01", nome: "Sala 101", bloco: "Bloco A", capacidade: 35 },
  { id: "sala-02", nome: "Sala 204", bloco: "Bloco B", capacidade: 45 },
  { id: "sala-03", nome: "Sala 305", bloco: "Bloco C", capacidade: 30 },
  { id: "sala-04", nome: "Sala 112", bloco: "Bloco A", capacidade: 25 },
];

export const reservas = [
  {
    id: "res-01",
    salaId: "sala-01",
    responsavel: "Prof. Ana Martins",
    turma: "DW2 — 2º período",
    data: "28/08/2026",
    horario: "08:00 — 09:40",
    status: "confirmada",
  },
  {
    id: "res-02",
    salaId: "sala-01",
    responsavel: "Prof. Bruno Lima",
    turma: "Engenharia — 4º período",
    data: "28/08/2026",
    horario: "10:00 — 11:40",
    status: "concluída",
  },
  {
    id: "res-03",
    salaId: "sala-02",
    responsavel: "Prof. Camila Rocha",
    turma: "ADS — 3º período",
    data: "28/08/2026",
    horario: "13:30 — 15:10",
    status: "em andamento",
  },
  {
    id: "res-04",
    salaId: "sala-02",
    responsavel: "Prof. Diego Alves",
    turma: "Licenciatura — 2º período",
    data: "28/08/2026",
    horario: "15:20 — 17:00",
    status: "confirmada",
  },
  {
    id: "res-05",
    salaId: "sala-03",
    responsavel: "Prof. Elisa Souza",
    turma: "Gestão — 1º período",
    data: "28/08/2026",
    horario: "08:00 — 09:40",
    status: "cancelada",
  },
  {
    id: "res-06",
    salaId: "sala-03",
    responsavel: "Prof. Felipe Costa",
    turma: "Mecânica — 5º período",
    data: "28/08/2026",
    horario: "10:00 — 11:40",
    status: "confirmada",
  },
  {
    id: "res-07",
    salaId: "sala-01",
    responsavel: "Prof. Gabriela Reis",
    turma: "Computação — 6º período",
    data: "28/08/2026",
    horario: "13:30 — 15:10",
    status: "concluída",
  },
  {
    id: "res-08",
    salaId: "sala-03",
    responsavel: "Prof. Hugo Nunes",
    turma: "Química — 2º período",
    data: "28/08/2026",
    horario: "15:20 — 17:00",
    status: "confirmada",
  },
];

export function encontrarReservaPorId(reservasAtuais, id) {
  return reservasAtuais.find((reserva) => reserva.id === id);
}

export function encontrarSalaPorId(id) {
  return salas.find((sala) => sala.id === id);
}

export function reservasDaSala(salaId, reservasAtuais) {
  return reservasAtuais.filter((reserva) => reserva.salaId === salaId);
}

export function atualizarStatusReserva(reservasAtuais, id, novoStatus) {
  if (!STATUS_RESERVA.includes(novoStatus)) {
    return reservasAtuais;
  }

  return reservasAtuais.map((reserva) =>
    reserva.id === id ? { ...reserva, status: novoStatus } : reserva,
  );
}
