/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { ReadingListsService } from './reading-lists.service';
import { SetStatusDto } from './dto/set-status.dto';

@Controller('reading-lists')
@UseGuards(AuthGuard('jwt'))
export class ReadingListsController {
  constructor(private readonly readingListsService: ReadingListsService) {}

  @Get('statuses')
  findMyStatuses(@Req() req: Request) {
    const user = req.user as { id: string } | undefined;
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }
    return this.readingListsService.findUserStatuses(user.id);
  }

  @Put('books/:bookId/status')
  setBookStatus(
    @Req() req: Request,
    @Param('bookId') bookId: string,
    @Body() setStatusDto: SetStatusDto,
  ) {
    const user = req.user as { id: string } | undefined;
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }
    return this.readingListsService.setBookStatus(
      user.id,
      bookId,
      setStatusDto,
    );
  }
}
