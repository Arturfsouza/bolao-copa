import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json(
      { mensagem: "Você precisa estar logado para salvar palpites." },
      { status: 401 }
    );
  }

  const usuario = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!usuario) {
    return Response.json(
      { mensagem: "Usuário não encontrado." },
      { status: 404 }
    );
  }

  const palpites = await request.json();

  const palpitesSalvos = await Promise.all(
    Object.entries(palpites).map(([matchId, palpite]) => {
      const dados = palpite as {
        golsMandante: string;
        golsVisitante: string;
      };

      return prisma.bet.upsert({
        where: {
          userId_matchId: {
            userId: usuario.id,
            matchId: Number(matchId),
          },
        },
        update: {
          golsMandante: Number(dados.golsMandante),
          golsVisitante: Number(dados.golsVisitante),
        },
        create: {
          userId: usuario.id,
          matchId: Number(matchId),
          golsMandante: Number(dados.golsMandante),
          golsVisitante: Number(dados.golsVisitante),
        },
      });
    })
  );

  return Response.json({
    mensagem: "Palpites salvos com sucesso",
    palpites: palpitesSalvos,
  });
}