import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.match.deleteMany({
    where: {
      codigo: {
        in: ["WC2026-R16-01", "WC2026-R16-02"],
      },
    },
  });

  console.log("Jogos de exemplo removidos.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });