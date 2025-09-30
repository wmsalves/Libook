import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Rota de teste protegida para administradores
  @Get('admin/test')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  adminTest() {
    return { message: 'Você é um administrador!' };
  }

  @Get()
  findAll(@Query('sortBy') sortBy?: string) {
    return this.booksService.findAll(sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }
}
