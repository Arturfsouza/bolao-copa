import { PrismaClient } from "@prisma/client";
import { worldCup2026KnockoutMatches } from "../data/world-cup-2026-knockout";

const prisma = new PrismaClient();

async function main() {
  for (const jogo of worldCup2026KnockoutMatches) {
    await prisma.match.upsert({
      where: {
        codigo: jogo.codigo,
      },
      update: jogo,
      create: jogo,
    });
  }

  console.log("Jogos do mata-mata atualizados com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });