import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query('q') query: string) {
    return this.searchService.searchBooks(query);
  }

  // Rota auxiliar para fazer a primeira indexação
  @Get('index')
  async index() {
    await this.searchService.indexBooks();
    return { message: 'Indexação iniciada em segundo plano.' };
  }
}
