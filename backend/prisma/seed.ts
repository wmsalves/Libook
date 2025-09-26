/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const hashedPassword = await argon2.hash('password123');

  // Upsert users to avoid creating duplicates
  await prisma.user.upsert({
    where: { email: 'user@libook.com' },
    update: {},
    create: {
      email: 'user@libook.com',
      name: 'Test User',
      password: hashedPassword,
      role: Role.USER,
    },
  });

  // Create authors
  const author1 = await prisma.author.upsert({
    where: { name: 'J.R.R. Tolkien' },
    update: {},
    create: { name: 'J.R.R. Tolkien' },
  });
  const author2 = await prisma.author.upsert({
    where: { name: 'George Orwell' },
    update: {},
    create: { name: 'George Orwell' },
  });

  // Create categories
  const cat1 = await prisma.category.upsert({
    where: { name: 'Fantasy' },
    update: {},
    create: { name: 'Fantasy' },
  });
  const cat2 = await prisma.category.upsert({
    where: { name: 'Dystopian' },
    update: {},
    create: { name: 'Dystopian' },
  });

  // Create books
  await prisma.book.upsert({
    where: { title: 'The Hobbit' },
    update: {},
    create: {
      title: 'The Hobbit',
      synopsis: 'A fantasy novel by J. R. R. Tolkien.',
      publicationYear: 1937,
      authors: { create: [{ authorId: author1.id }] },
      categories: { create: [{ categoryId: cat1.id }] },
    },
  });

  await prisma.book.upsert({
    where: { title: '1984' },
    update: {},
    create: {
      title: '1984',
      synopsis: 'A dystopian social science fiction novel and cautionary tale.',
      publicationYear: 1949,
      authors: { create: [{ authorId: author2.id }] },
      categories: { create: [{ categoryId: cat2.id }] },
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
