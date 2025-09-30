import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '../auth/dto/create-book.dto';
import { UpdateBookDto } from '../auth/dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // --- Rotas de Admin (Protegidas) ---
  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  // --- Rotas Públicas ---
  @Get()
  findAll(@Query('sortBy') sortBy?: string) {
    return this.booksService.findAll(sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }
}
