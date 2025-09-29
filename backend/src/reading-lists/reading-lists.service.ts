import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { SetStatusDto } from './dto/set-status.dto';

@Injectable()
export class ReadingListsService {
  constructor(private prisma: PrismaService) {}

  // Define ou atualiza o status de um livro para um usuário
  async setBookStatus(
    userId: string,
    bookId: string,
    setStatusDto: SetStatusDto,
  ) {
    const { status } = setStatusDto;

    return this.prisma.readingList.upsert({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      update: {
        status, // Se já existir, apenas atualiza o status
      },
      create: {
        userId,
        bookId,
        status, // Se não existir, cria o registro completo
      },
    });
  }

  // Busca todos os status de leitura de um usuário
  async findUserStatuses(userId: string) {
    const statuses = await this.prisma.readingList.findMany({
      where: { userId },
      select: {
        bookId: true,
        status: true,
      },
    });

    // Transforma o array em um objeto para acesso mais fácil no frontend
    // Ex: { "bookId1": "READING", "bookId2": "READ" }
    return statuses.reduce(
      (acc, current) => {
        acc[current.bookId] = current.status;
        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
