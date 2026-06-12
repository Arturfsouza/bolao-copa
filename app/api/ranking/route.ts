import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function calcularPontos(
  palpiteMandante: number,
  palpiteVisitante: number,
  realMandante: number,
  realVisitante: number
) {
  if (
    palpiteMandante === realMandante &&
    palpiteVisitante === realVisitante
  ) {
    return 10;
  }

  const resultadoPalpite = Math.sign(palpiteMandante - palpiteVisitante);
  const resultadoReal = Math.sign(realMandante - realVisitante);

  if (resultadoPalpite === resultadoReal) {
    return 5;
  }

  return 0;
}

export async function GET() {
  try {
    const usuarios = await prisma.user.findMany({
      include: {
        bets: {
          include: {
            match: true,
          },
        },
      },
    });

    const ranking = usuarios
      .map((usuario: any) => {
        const pontos = usuario.bets.reduce((total: number, bet: any) => {
          if (!bet.match) {
            return total;
          }

          if (
            bet.match.golsMandante === null ||
            bet.match.golsVisitante === null
          ) {
            return total;
          }

          return (
            total +
            calcularPontos(
              bet.golsMandante,
              bet.golsVisitante,
              bet.match.golsMandante,
              bet.match.golsVisitante
            )
          );
        }, 0);

        return {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          totalApostas: usuario.bets.length,
          pontos,
        };
      })
      .sort((a: any, b: any) => b.pontos - a.pontos);

    return Response.json(ranking);
  } catch (erro) {
    console.error("Erro ao carregar ranking:", erro);

    return Response.json(
      { mensagem: "Erro ao carregar ranking." },
      { status: 500 }
    );
  }
}