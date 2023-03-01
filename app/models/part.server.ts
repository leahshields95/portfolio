
import { Part } from ".prisma/client";
import { prisma } from "~/db.server";

export async function getParts() {
  return prisma.part.findMany();
}

export async function getPartById(id: number) {
  return prisma.part.findUnique({
    where: { id },
  });
}

export async function getPartConfigsByPartId(part_id: number) {
  return prisma.partConfig.findMany({
    where: { part_id },
  });
}

export async function getPartMassesByPartConfigId(configuration_id: number) {
  console.warn(configuration_id)
  return prisma.measuredPartMass.findMany({
    where: { configuration_id },
  });
}