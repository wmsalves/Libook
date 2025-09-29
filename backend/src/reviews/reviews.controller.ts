/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

// Todas as rotas neste controller começarão com 'books/:bookId/reviews'
@Controller('books/:bookId/reviews')
@UseGuards(AuthGuard('jwt')) // Protege todos os endpoints
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(
    @Param('bookId') bookId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: Request,
  ) {
    if (!req.user || typeof req.user !== 'object' || !('id' in req.user)) {
      throw new Error('Authenticated user not found or missing id');
    }

    const userId = (req.user as any).id; // Extrai o ID do usuário autenticado
    return this.reviewsService.create(bookId, userId, createReviewDto);
  }

  @Get()
  findAll(@Param('bookId') bookId: string) {
    return this.reviewsService.findByBookId(bookId);
  }
}
