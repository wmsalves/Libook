import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('authors')
@UseGuards(AuthGuard('jwt'))
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }
}
