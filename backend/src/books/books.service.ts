import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBookDto } from 'src/auth/dto/create-book.dto';
import { UpdateBookDto } from 'src/auth/dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  findAll(sortBy?: string) {
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

    return this.prisma.book.findMany({
      orderBy,
      include: {
        authors: { select: { author: { select: { name: true } } } },
        categories: { select: { category: { select: { name: true } } } },
      },
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        authors: {
          select: { author: { select: { name: true } } },
        },
        categories: {
          select: { category: { select: { name: true } } },
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

    return this.prisma.book.create({
      data: {
        ...bookData,
        authors: {
          create: authorIds.map((id) => ({ author: { connect: { id } } })),
        },
        categories: {
          create: categoryIds?.map((id) => ({ category: { connect: { id } } })),
        },
      },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const { authorIds, categoryIds, ...bookData } = updateBookDto;

    return this.prisma.$transaction(async (tx) => {
      if (authorIds) {
        await tx.authorOnBook.deleteMany({ where: { bookId: id } });
        await tx.authorOnBook.createMany({
          data: authorIds.map((authorId) => ({ bookId: id, authorId })),
        });
      }
      if (categoryIds) {
        await tx.categoryOnBook.deleteMany({ where: { bookId: id } });
        await tx.categoryOnBook.createMany({
          data: categoryIds.map((categoryId) => ({ bookId: id, categoryId })),
        });
      }

      const updatedBook = await tx.book.update({
        where: { id },
        data: bookData,
      });

      return updatedBook;
    });
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
