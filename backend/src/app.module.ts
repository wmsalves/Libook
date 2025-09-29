import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- 1. IMPORTE AQUI
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReadingListsModule } from './reading-lists/reading-lists.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BooksModule,
    ReviewsModule,
    ReadingListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
