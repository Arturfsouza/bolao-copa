import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!isAdmin(session?.user?.email)) {
    return Response.json(
      { mensagem: "Apenas administradores podem alterar resultados." },
      { status: 403 }
    );
  }
  const { id } = await context.params;
  const body = await request.json();

  const match = await prisma.match.update({
    where: {
      id: Number(id),
    },
    data: {
      golsMandante: Number(body.golsMandante),
      golsVisitante: Number(body.golsVisitante),
    },
  });

  return Response.json({
    mensagem: "Resultado atualizado com sucesso",
    match,
  });
}