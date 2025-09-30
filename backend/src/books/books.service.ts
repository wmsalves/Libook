import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBookDto } from '../auth/dto/create-book.dto';
import { UpdateBookDto } from '../auth/dto/update-book.dto';
import { SearchService } from '../search/search.service';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private searchService: SearchService,
  ) {}

  async findAll(options: { sortBy?: string; page?: number; limit?: number }) {
    const { sortBy, page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    let orderBy: Prisma.BookOrderByWithRelationInput = {};

    switch (sortBy) {
      case 'most_recent':
        orderBy = { createdAt: 'desc' };
        break;
      case 'title_asc':
        orderBy = { title: 'asc' };
        break;
      case 'most_rated':
        orderBy = { reviews: { _count: 'desc' } };
        break;
      default:
        orderBy = {};
        break;
    }

    const [books, totalItems] = await this.prisma.$transaction([
      this.prisma.book.findMany({
        skip,
        take: limit,
        orderBy,
        include: {
          authors: { select: { author: { select: { name: true } } } },
          categories: { select: { category: { select: { name: true } } } },
        },
      }),
      this.prisma.book.count(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: books,
      meta: {
        totalItems,
        itemCount: books.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        synopsis: true,
        publicationYear: true,
        pageCount: true,
        coverUrl: true,
        authors: {
          select: { author: { select: { id: true, name: true } } },
        },
        categories: {
          select: { category: { select: { id: true, name: true } } },
        },
      },
    });

    if (!book) {
      throw new NotFoundException(`Livro com o ID "${id}" não encontrado.`);
    }

    return book;
  }

  async create(createBookDto: CreateBookDto) {
    const { authorIds, categoryIds, ...bookData } = createBookDto;

    const newBook = await this.prisma.book.create({
      data: {
        ...bookData,
        authors: {
          create: authorIds.map((id) => ({ author: { connect: { id } } })),
        },
        categories: {
          create: categoryIds?.map((id) => ({ category: { connect: { id } } })),
        },
      },
      include: {
        authors: { select: { author: { select: { name: true } } } },
        categories: { select: { category: { select: { name: true } } } },
      },
    });

    await this.searchService.addBook({
      ...newBook,
      authors: newBook.authors.map((a) => a.author.name),
      categories: newBook.categories.map((c) => c.category.name),
    });

    return newBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const { authorIds, categoryIds, ...bookData } = updateBookDto;

    // Uma única transação para garantir a integridade dos dados
    const updatedBook = await this.prisma.$transaction(async (tx) => {
      // Se um novo array de IDs de autores foi enviado, atualiza as relações
      if (authorIds) {
        // 1. Apaga todas as relações de autor existentes para este livro
        await tx.authorOnBook.deleteMany({ where: { bookId: id } });
        // 2. Cria as novas relações com base nos IDs fornecidos
        await tx.authorOnBook.createMany({
          data: authorIds.map((authorId) => ({ bookId: id, authorId })),
        });
      }

      // O mesmo processo para as categorias
      if (categoryIds) {
        await tx.categoryOnBook.deleteMany({ where: { bookId: id } });
        await tx.categoryOnBook.createMany({
          data: categoryIds.map((categoryId) => ({ bookId: id, categoryId })),
        });
      }

      // 3. Atualiza os dados principais do livro (título, sinopse, etc.)
      const book = await tx.book.update({
        where: { id },
        data: bookData,
        // Inclui as relações atualizadas no objeto retornado
        include: {
          authors: { select: { author: { select: { name: true } } } },
          categories: { select: { category: { select: { name: true } } } },
        },
      });

      return book;
    });

    // 4. Após a transação ser bem-sucedida, sincroniza o resultado com o MeiliSearch
    await this.searchService.updateBook({
      ...updatedBook,
      // Formata os dados para o MeiliSearch (um array simples de nomes)
      authors: updatedBook.authors.map((a) => a.author.name),
      categories: updatedBook.categories.map((c) => c.category.name),
    });

    return updatedBook;
  }

  async remove(id: string) {
    const deletedBook = await this.prisma.book.delete({ where: { id } });
    await this.searchService.deleteBook(id);

    return deletedBook;
  }
}
