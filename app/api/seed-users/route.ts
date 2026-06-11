import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const usuario = await prisma.user.upsert({
    where: {
      email: "artur@email.com",
    },
    update: {},
    create: {
      name: "Artur",
      email: "artur@email.com",
    },
  });

  return Response.json(usuario);
}