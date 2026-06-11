import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json({});
  }

  const usuario = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      bets: true,
    },
  });

  if (!usuario) {
    return Response.json({});
  }

  const palpites = Object.fromEntries(
    usuario.bets.map((bet) => [
      bet.matchId,
      {
        golsMandante: String(bet.golsMandante),
        golsVisitante: String(bet.golsVisitante),
      },
    ])
  );

  return Response.json(palpites);
}