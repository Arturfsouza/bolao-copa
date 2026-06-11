import { PrismaClient } from "@prisma/client";
import { worldCup2026Matches } from "../data/world-cup-2026-matches";

const prisma = new PrismaClient();

async function main() {
  await prisma.match.createMany({
    data: worldCup2026Matches,
    skipDuplicates: true,
  });

  console.log("Jogos importados com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });