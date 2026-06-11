import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";
import { PrismaClient } from "@prisma/client";
import { worldCup2026Matches } from "@/data/world-cup-2026-matches";

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();

  if (!isAdmin(session?.user?.email)) {
    return Response.json(
      { mensagem: "Apenas administradores podem importar jogos." },
      { status: 403 }
    );
  }

  const resultado = await prisma.match.createMany({
    data: worldCup2026Matches,
    skipDuplicates: true,
  });

  return Response.json({
    mensagem: "Jogos importados com sucesso",
    quantidade: resultado.count,
  });
}