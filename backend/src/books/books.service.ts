import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany({
      include: {
        authors: {
          select: {
            author: {
              select: {
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
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
