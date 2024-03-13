import { Body, Controller, Get, Post, Patch, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CloseAccountCommand } from './dto/close-account.command';
import { OpenAccountCommand } from './dto/open-account.command';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('open')
  @UsePipes(ValidationPipe)
  async openAccount(@Body() dto: OpenAccountCommand){
    return await this.appService.openAccount(dto)
  }
  @Post('/close')
  async closeAccount(@Body() id: CloseAccountCommand){
    return await this.appService.closeAccount(id)
  }
  @Get()
  async getAccounts(){
    return await this.appService.getAccounts()
  }
}
