import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Receivable } from './schema/receivable.schema';
import { UpdateReceivableWebRequest } from './wr/update-receivable.wr';
import { CreateReceivableWebRequest } from './wr/create-receivable.wr';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createReceivableWebRequest: CreateReceivableWebRequest) {
    this.appService.postReceivable(createReceivableWebRequest);
  }

  @Get(':id')
  getReceivable(@Param() params: any): Promise<Receivable> {
    return this.appService.getReceivable(params.id);
  }

  @Put(':id')
  updateReceivable(
    @Param() params: any,
    @Body() updateReceivableWebRequest: UpdateReceivableWebRequest,
  ) {
    this.appService.updateReceivable(params.id, updateReceivableWebRequest);
  }

  @Delete(':id')
  deleteReceivable(@Param() params: any) {
    this.appService.deleteReceivable(params.id);
  }
}
