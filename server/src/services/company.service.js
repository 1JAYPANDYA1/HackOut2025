import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createCompanyService = async (data) => {
  const {
    name,
    logoUrl,
    email,
    phoneNumber,
    contactPerson,
    address,
    isoCertificate,
  } = data;

  const result = await prisma.$queryRaw`
    CALL insert_company(${name}, ${logoUrl}, ${email}, ${phoneNumber}, ${contactPerson}, ${address}, ${isoCertificate});
  `;

  return result;
};
