import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@logosagency.it";
  const password = process.env.ADMIN_PASSWORD || "ChangeMeNow!2026";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      name: "Admin Logos",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      email: process.env.CONTACT_EMAIL || "logosdev.agency@gmail.com",
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "393283634905",
      socialInstagram: "https://www.instagram.com/logosagency.dev/",
      marqueeEnabled: true,
      marqueeAutoplay: true,
    },
  });

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const stubs = [
      {
        title: "Progetto 01",
        slug: "progetto-01",
        category: "Web Design",
        shortDescription: "Inserisci qui la descrizione breve del primo progetto reale.",
        sortOrder: 0,
      },
      {
        title: "Progetto 02",
        slug: "progetto-02",
        category: "E-commerce",
        shortDescription: "Inserisci qui la descrizione breve del secondo progetto reale.",
        sortOrder: 1,
      },
      {
        title: "Progetto 03",
        slug: "progetto-03",
        category: "Web App",
        shortDescription: "Inserisci qui la descrizione breve del terzo progetto reale.",
        sortOrder: 2,
      },
      {
        title: "Progetto 04",
        slug: "progetto-04",
        category: "SaaS",
        shortDescription: "Inserisci qui la descrizione breve del quarto progetto reale.",
        sortOrder: 3,
      },
    ];

    for (const stub of stubs) {
      await prisma.project.create({
        data: {
          ...stub,
          status: "draft",
          showInHome: true,
          challenge: "",
          solution: "",
          services: "[]",
          technologies: "[]",
        },
      });
    }
  }

  console.log("Seed complete.");
  console.log(`Admin: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
