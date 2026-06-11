import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const jogos = await prisma.match.createMany({
    data: [
      {
        mandante: "Brasil",
        visitante: "Alemanha",
        dataHora: new Date("2026-06-12T16:00:00"),
      },
      {
        mandante: "Argentina",
        visitante: "França",
        dataHora: new Date("2026-06-13T19:00:00"),
      },
      {
        mandante: "Espanha",
        visitante: "Portugal",
        dataHora: new Date("2026-06-14T15:00:00"),
      },
    ],
  });

  return Response.json({
    sucesso: true,
    jogosInseridos: jogos.count,
  });
}