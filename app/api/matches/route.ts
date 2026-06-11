import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const jogos = await prisma.match.findMany({
    orderBy: {
      dataHora: "asc",
    },
  });

  return Response.json(jogos);
}