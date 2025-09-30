/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// Função principal que fará todo o trabalho
async function main() {
  console.log('Iniciando a importação de livros...');

  // 1. Pega a chave da API do arquivo .env
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    throw new Error('A chave da Google Books API não foi encontrada no .env');
  }

  // 2. Define o termo de busca. Você pode mudar isso para buscar o que quiser!
  const searchQuery = 'C#';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=20&key=${apiKey}`;

  try {
    // 3. Faz a chamada para a API do Google
    const response = await axios.get(url);
    const books = response.data.items || [];

    console.log(
      `Encontrados ${books.length} livros para o termo "${searchQuery}".`,
    );

    // 4. Percorre cada livro retornado pela API
    for (const book of books) {
      const volumeInfo = book.volumeInfo;

      // Pula livros sem título ou autores
      if (!volumeInfo.title || !volumeInfo.authors) {
        continue;
      }

      // Upsert (cria ou atualiza) os autores
      const authorIds = await Promise.all(
        volumeInfo.authors.map(async (authorName: string) => {
          const author = await prisma.author.upsert({
            where: { name: authorName },
            update: {},
            create: { name: authorName },
          });
          return author.id;
        }),
      );

      // Upsert (cria ou atualiza) as categorias
      const categoryIds = await Promise.all(
        (volumeInfo.categories || []).map(async (categoryName: string) => {
          const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName },
          });
          return category.id;
        }),
      );

      // 5. Upsert do livro no nosso banco de dados
      console.log(`Importando: "${volumeInfo.title}"...`);
      await prisma.book.upsert({
        where: { title: volumeInfo.title },
        update: {},
        create: {
          title: volumeInfo.title,
          synopsis: volumeInfo.description,
          publicationYear: volumeInfo.publishedDate
            ? parseInt(volumeInfo.publishedDate.substring(0, 4))
            : undefined,
          pageCount: volumeInfo.pageCount,
          coverUrl: volumeInfo.imageLinks?.thumbnail,
          authors: {
            create: authorIds.map((id) => ({ authorId: id })),
          },
          categories: {
            create: categoryIds.map((id) => ({ categoryId: id })),
          },
        },
      });
    }

    console.log('Importação concluída com sucesso!');
  } catch (error) {
    console.error(
      'Ocorreu um erro durante a importação:',
      error.response?.data || error.message,
    );
  }
}

// Executa a função main e garante que o Prisma se desconecte no final
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
