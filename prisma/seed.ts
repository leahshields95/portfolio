import { PrismaClient } from "@prisma/client";
import userJson from './resources/users.json';
import partsJson from './resources/parts.json';
import partConfigJson from './resources/partConfig.json';
import measuredPartMassJson from './resources/measuredPartMass.json';

const prisma = new PrismaClient();


async function seed() {

  const users = userJson;
  for (const user of users) {
    await prisma.user.create(
      {
        data: user,
      }
    );
  }

  const parts = partsJson;
  for (const part of parts) {
    await prisma.part.create(
      {
        data: part,
      }
    );
    }

  const partConfigs = partConfigJson;
  for (const partConfig of partConfigs) {
    await prisma.partConfig.create(
      {
        data: partConfig,
      }
    );
    }

  const measuredPartMasses = measuredPartMassJson;
  for (const measuredPartMass of measuredPartMasses) {
    await prisma.measuredPartMass.create(
      {
        data: measuredPartMass,
      }
    );
    }
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
