const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function main() {
  try {
    const createMany = await prisma.user.createMany({
      data: [
        { name: "Selva", place: "Chennai" },
        { name: "Suriya", place: "Chennai" },
        { name: "Sami", place: "Chennai" },
        { name: "Prasath", place: "Chennai" },
      ],
    });
    console.log("Created " + createMany + " Users");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
