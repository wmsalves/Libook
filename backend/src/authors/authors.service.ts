import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.author.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
