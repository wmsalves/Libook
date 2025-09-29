import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  // Cria uma nova resenha
  create(bookId: string, userId: string, createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        bookId,
        userId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
      },
    });
  }

  // Busca todas as resenhas de um livro específico
  findByBookId(bookId: string) {
    return this.prisma.review.findMany({
      where: { bookId },
      include: {
        // Inclui o nome do usuário que fez a resenha
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Mostra as mais recentes primeiro
      },
    });
  }
}
