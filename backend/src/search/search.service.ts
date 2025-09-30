import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MeiliSearch from 'meilisearch';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class SearchService implements OnModuleInit {
  private client: InstanceType<typeof MeiliSearch>;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const host = this.configService.get<string>('MEILISEARCH_HOST');
    const apiKey = this.configService.get<string>('MEILISEARCH_API_KEY');
    if (!host) {
      throw new Error(
        'MEILISEARCH_HOST is not defined in environment variables',
      );
    }
    this.client = new MeiliSearch({
      host,
      apiKey,
    });
  }

  // Este método roda quando o módulo é iniciado
  async onModuleInit() {
    const booksIndex = this.client.index('books');
    // Define quais atributos podem ser buscados
    await booksIndex.updateSearchableAttributes([
      'title',
      'synopsis',
      'authors',
    ]);
    // Define quais atributos podem ser filtrados ou ordenados
    await booksIndex.updateFilterableAttributes([
      'publicationYear',
      'categories',
    ]);
  }

  async indexBooks() {
    console.log('Iniciando indexação de todos os livros para o MeiliSearch...');
    const books = await this.prisma.book.findMany({
      include: {
        authors: { select: { author: { select: { name: true } } } },
        categories: { select: { category: { select: { name: true } } } },
      },
    });

    // Formata os dados para o formato que o MeiliSearch espera
    const formattedBooks = books.map((book) => ({
      ...book,
      authors: book.authors.map((a) => a.author.name),
      categories: book.categories.map((c) => c.category.name),
    }));

    const index = this.client.index('books');
    const task = await index.addDocuments(formattedBooks);
    console.log(`Tarefa de indexação enviada. Task ID: ${task.taskUid}`);
  }

  // Métodos para sincronização
  async addBook(book: any) {
    const index = this.client.index('books');
    await index.addDocuments([book]);
  }

  async updateBook(book: any) {
    const index = this.client.index('books');
    await index.updateDocuments([book]);
  }

  async deleteBook(bookId: string) {
    const index = this.client.index('books');
    await index.deleteDocument(bookId);
  }

  // Método de busca
  async searchBooks(query: string) {
    const index = this.client.index('books');
    return index.search(query);
  }
}
