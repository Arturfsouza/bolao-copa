import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fase = searchParams.get("fase");

  const jogos = await prisma.match.findMany({
    where: fase
      ? {
          fase,
        }
      : undefined,
    orderBy: {
      dataHora: "asc",
    },
  });

  return Response.json(jogos);
}