/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

// A rota base continua a mesma
@Controller('books/:bookId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('bookId') bookId: string,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: Request & { user?: { id?: string } },
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    return this.reviewsService.create(bookId, userId, createReviewDto);
  }

  @Get()
  findAll(@Param('bookId') bookId: string) {
    return this.reviewsService.findByBookId(bookId);
  }
}
