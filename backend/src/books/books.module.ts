import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ReviewsModule } from '../reviews/reviews.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [ReviewsModule, SearchModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
