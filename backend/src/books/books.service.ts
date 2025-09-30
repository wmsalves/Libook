import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
}
