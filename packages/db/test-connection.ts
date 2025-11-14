import { prisma } from "./src/index";

async function main() {
  const org = await prisma.organization.create({
    data: {
      clerkOrgId: "test_org_123",
      name: "Test Company",
      slug: "test-company",
    },
  });

  console.log("Created Organization", org);

  await prisma.organization.delete({ where: { id: org.id } });
  console.log("Cleaned up test data");
}

main().catch(console.error).finally(() => prisma.$disconnect)
